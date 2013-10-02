<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class Voucher_Rpt extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }



    public function AR_Voucher(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/AR/AR_Voucher.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function GL_Voucher(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/GL/GL_Voucher.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function KasBankKeluar_Voucher(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/CB/KasBankKeluar_Voucher.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function KasBankMasuk_Voucher(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/CB/KasBankMasuk_Voucher.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
}
