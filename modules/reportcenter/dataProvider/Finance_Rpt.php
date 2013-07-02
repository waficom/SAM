<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class Finance_Rpt extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }


    public function AP_Invoice(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/AP/AP_Invoice.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function Laporan_Ap_Invoice(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/AP/Laporan_AP_Invoice.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function Laporan_AR(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/AR/Laporan_AR.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function Laporan_Kas_Harian(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/CB/Laporan_Kas_Harian.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function General_Jurnal(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/GL/GL.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function Trial_Balance(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/GL/TB.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
}
