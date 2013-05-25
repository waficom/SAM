<?php
/**
 * Created by JetBrains PhpStorm.
 * User: erodriguez
 * Date: 4/14/12
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once($_SESSION['root'] . '/classes/FileManager.php');
//include_once ('/var/www/sam-new/classes/FileManager.php');
require_once($_SESSION['root'] . '/lib/JavaBridge/java/Java.inc');

//require_once('/var/www/sam-new/lib/JavaBridge/java/Java.inc');

class Reports
{
    public $reportfile;
    public $filename;
    protected $fileManager;

    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        $this->fileManager = new FileManager();
        return;
    }

    public function report_parse_post_parameters(stdClass $parameters)
    {
        $data = get_object_vars($parameters);

        # Automatically extract report parameters (data types converted in report).
        $params = new java('java.util.HashMap');

        # Pass the remaining POST "report_TYP" variables as report parameters.
        foreach( $data as $name => $value ) {

            if( strpos( $name, 'report_' ) === 0 ) {
                $length = strlen( 'report_' );

                if( strpos( $name, 'report_int_' ) === 0 ) {
                    $value = intval( $value );
                    $length = strlen( 'report_int_' );

                    $value = convertValue( $value, 'java.lang.Integer' );
                    $params->put( substr( $name, $length ), $value );
                }
                else if( strpos( $name, 'report_arr_' ) === 0 ) {
                    $length = strlen( 'report_arr_' );
                    $arrays = array_filter( explode( ',', $data[ $name ] ) );

                    # Map the values of the array form parameter to a java.util.ArrayList.
                    $arrayList = new java( 'java.util.ArrayList' );

                    foreach( $arrays as $value ) {
                        $arrayList->add( $value );
                    }

                    # Pass values into the report (without the "report_arr_" prefix).
                    $params->put( substr( $name, $length ), $arrayList );
                }
                else {
                    $params->put( substr( $name, $length ), $value );
                }
            }
        }

        return $params;
    }

    public function report_execute(stdClass $parameters)
    {


        $dbhost = (string)$_SESSION['site']['db']['host'];
        $dbport = (int)$_SESSION['site']['db']['port'];
        $dbname = (string)$_SESSION['site']['db']['database'];
        $dbuser = (string)$_SESSION['site']['db']['username'];
        $dbpass = (string)$_SESSION['site']['db']['password'];


        $conn = null;
        $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.pdf';

        try {

            $params = $this->report_parse_post_parameters($parameters);

            # Load the PostgreSQL database driver.
            java( 'java.lang.Class' )->forName( 'org.firebirdsql.jdbc.FBDriver' );

            # Attempt a database connection.
            $conn = java( 'java.sql.DriverManager' )->getConnection(
                "jdbc:firebirdsql://$dbhost:$dbport//$dbname",$dbuser, $dbpass);


            $jaspercompiledreport = new java("net.sf.jasperreports.engine.util.JRLoader");
            $report = $jaspercompiledreport->loadObject($this->reportfile);

            # Use the fill manager to produce the report.
            $fm = java('net.sf.jasperreports.engine.JasperFillManager');
            $pm = $fm->fillReport($report, $params, $conn);

            try {
                $exporter = new java("net.sf.jasperreports.engine.export.JRPdfExporter");
                $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                                        $_SESSION['site']['temp']['path'] . '/' .$this->filename);

            } catch (JavaException $ex) {
                echo $ex;
            }
            header("Content-type: application/pdf");
            header("Content-Disposition: attachment; filename=$this->filename");

            $exporter->exportReport();

            $conn->close();

        }
        catch( Exception $ex ) {
            if( $conn != null ) {
                $conn->close();
            }

            throw $ex;
        }

        return $_SESSION['site']['temp']['url'] . '/' . $this->filename;

    }


}

//
//$r = new Reports();
//$r->reportfile = '/var/www/sam-new/bs.jasper';
//$stdc = new StdClass;
//$stdc->report_staff = 'IMAM';
//$r->report_execute($stdc);
//print_r($r->uri);
//print_r($r->pdffile);


