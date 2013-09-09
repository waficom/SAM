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
    public function Ringkasan_Hutang(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/AP/Aging_AP.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function Rincian_Hutang(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/AP/Rincian_Aging_AP.jasper';
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
    public function Ringkasan_Piutang(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/AR/Aging_AR.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function Rincian_Piutang(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/AR/Rincian_Aging_AR.jasper';
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
    public function Neraca(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/GL/NRC.jasper';
        $this->lokasirpt = '/var/www/modules/reportcenter/report/GL/';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function DetailHPP(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/GL/RincianHPP.jasper';
        $this->lokasirpt = '/var/www/modules/reportcenter/report/GL/';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function SummaryHPP(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/GL/SummaryHPP.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function Laporan_P_Cashbon(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/CB/PenyelesaianCashbon.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
}
