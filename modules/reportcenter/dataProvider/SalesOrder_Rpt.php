<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class SalesOrder_Rpt extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }

    public function SalesOrder(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/marketing/SalesOrder.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function DataKonsumen(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/marketing/DataKonsumen.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function RekapPenjualan(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/marketing/RekapPenjualan.jasper';
        $params =
        //print_r($params->params);
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function PerformanceCabang(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/marketing/PerformanceCabang.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function PriceList(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/marketing/PriceList.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function SuratPesanan(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/marketing/SuratPesanan.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function PermintaanProduksi(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/PermintaanProduksi.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

}
