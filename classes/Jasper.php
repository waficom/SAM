<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}

ini_set('max_input_time', '1500');
ini_set('max_execution_time', '1500');

class Jasper
{
    public $reportfile;
    public $outputfile;

    function report_parse_post_parameters() {
        # Automatically extract report parameters (data types converted in report).
        $params = new java('java.util.HashMap');

        # Pass the remaining POST "report_TYP" variables as report parameters.
        foreach( $_POST as $name => $value ) {
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
                    $arrays = array_filter( explode( ',', $_POST[ $name ] ) );

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

    function report2pdf( ) {

        $PERSIST = 'jdbc';

        $dbhost = (string)$_SESSION['site']['db']['host'];
        $dbport = (int)$_SESSION['site']['db']['port'];
        $dbname = (string)$_SESSION['site']['db']['database'];
        $dbuser = (string)$_SESSION['site']['db']['username'];
        $dbpass = (string)$_SESSION['site']['db']['password'];


        $conn = null;
//       $report = realpath( './reports/report-filename.jasper' );

        try {
            $params = report_parse_post_parameters();

            # Load the PostgreSQL database driver.
            java( 'java.lang.Class' )->forName( 'org.firebirdsql.jdbc.FBDriver' );

            # Attempt a database connection.
            $conn = java( 'java.sql.DriverManager' )->getConnection(
                "jdbc:firebirdsql://$dbhost:$dbport//$dbname",$dbuser, $dbpass);

            # Use the fill manager to produce the report.
            $fm = java('net.sf.jasperreports.engine.JasperFillManager');
            $pm = $fm->fillReport($this->reportfile, $params, $conn);

            header('Cache-Control: private');
            header('Content-Description: File Transfer');
            header("Content-Disposition: attachment; filename=$this->outputfile.pdf");
            header('Content-Type: application/pdf');
            header('Content-Transfer-Encoding: binary');

            java_set_file_encoding('ISO-8859-1');

            $em = java('net.sf.jasperreports.engine.JasperExportManager');
            $result = $em->exportReportToPdf($pm);

            $conn->close();

            header('Content-Length: ' . strlen( $result ) );
            echo $result;
        }
        catch( Exception $ex ) {
            if( $conn != null ) {
                $conn->close();
            }

            throw $ex;
        }
    }
}
?>