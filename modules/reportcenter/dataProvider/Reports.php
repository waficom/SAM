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
require_once($_SESSION['root'] . '/lib/JavaBridge/java/Java.inc');

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

    public function DateConvert($date) {

        # Exception
        if (!is_null($date))
        {
            $date = new DateTime($date, new DateTimeZone($_SESSION['site']['timezone']));
            $strdate = $date->format('m/d/Y H:i:s');

            # Separate Date from Time
            $strdate = explode(" ", $strdate);

            $date = $strdate[0];

        }

        return $date;

    } # End Function

    public function convertValue($value, $className)

    {

        // if we are a string, just use the normal conversion

        // methods from the java extension...

        try

        {

            if ($className == 'java.lang.String')

            {

                $temp = new Java('java.lang.String', $value);

                return $temp;

            }

            else if ($className == 'java.util.Date')

            {

                $temp = new Java($className, $value);


                return $temp;

            }

            else if ($className == 'java.lang.Boolean' ||

                $className == 'java.lang.Integer' ||

                $className == 'java.lang.Long' ||

                $className == 'java.lang.Short' ||

                $className == 'java.lang.Double' ||

                $className == 'java.math.BigDecimal')

            {

                $temp = new Java($className, $value);

                return $temp;

            }

            else if ($className == 'java.sql.Timestamp' ||

                $className == 'java.sql.Time')

            {

                $temp = new Java($className);

                $javaObject = $temp->valueOf($value);

                return $javaObject;

            }

        }

        catch (Exception $err)

        {

            echo (  'unable to convert value, ' . $value .

                ' could not be converted to ' . $className);

            return false;

        }
    }

    public function report_parse_post_parameters(stdClass $parameters)
    {
        //error_reporting(-1);
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

                    $value = $this->convertValue( $value, 'java.lang.Integer' );
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
                else if ( strpos($name, 'report_date_') === 0) {
                    $length = strlen ('report_date_');

                    $value = $this->DateConvert( $value );

                    $value = $this->convertValue($value, 'java.util.Date');

                    $params->put(substr($name,$length), $value);
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
        $formatType = 'PDF';

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

            switch ($formatType) {
                case 'XLS':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.xls';


                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.JRXlsExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRXlsExporterParameter")->IS_ONE_PAGE_PER_SHEET, java("java.lang.Boolean")->TRUE);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRXlsExporterParameter")->IS_WHITE_PAGE_BACKGROUND, java("java.lang.Boolean")->FALSE);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRXlsExporterParameter")->IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, java("java.lang.Boolean")->TRUE);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/vnd.ms-excel");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'CSV':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.csv';

                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.JRCsvExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRCsvExporterParameter")->FIELD_DELIMITER, ",");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRCsvExporterParameter")->RECORD_DELIMITER, "\n");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRCsvExporterParameter")->CHARACTER_ENCODING, "UTF-8");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/csv");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'DOC':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.doc';

                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.ooxml.JRDocxExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);


                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/vnd.ms-word");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'HTML':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.html';

                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.JRHtmlExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);


                    } catch (JavaException $ex) {
                        echo $ex;
                    }
                    break;
                case 'PDF':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.pdf';

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

                    break;
                case 'ODS':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.ods';

                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.oasis.JROdsExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/vnd.oasis.opendocument.spreadsheet");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'ODT':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.odt';

                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.oasis.JROdtExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/vnd.oasis.opendocument.text");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'TXT':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.txt';

                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.JRTextExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRTextExporterParameter")->PAGE_WIDTH, 120);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRTextExporterParameter")->PAGE_HEIGHT, 60);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: text/plain");
                    break;
                case 'RTF':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.rtf';

                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.JRRtfExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/rtf");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'PPT':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.pptx';
                    try {
                        $exporter = new java("net.sf.jasperreports.engine.export.ooxml.JRPptxExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            $_SESSION['site']['temp']['path'] . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: aapplication/vnd.ms-powerpoint");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
            }

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

/*
$r = new Reports();
$r->reportfile = '/var/www/sam-new/modules/reportcenter/report/marketing/bs.jasper';
$stdc = new StdClass;
$stdc->report_date_datefrom = '01/01/2009';
$stdc->report_date_dateto = '01/01/2010';
$r->report_execute($stdc);
print_r($r);
*/

