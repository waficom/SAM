<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class Logistics_Rpt extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }


    public function PurchaseOrder(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/PurchaseOrder.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function PengadaanBarang(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/PengadaanBarang.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

    public function FormPurchaseOrder(stdClass $params)
    {


//        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/Form_PurchaseOrder.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function FormulirPermintaanBarang(stdClass $params)
{
    $this->reportfile = '/var/www/modules/reportcenter/report/logistics/FormulirPermintaanBarang.jasper';

    $url = $this->report_execute($params->params);
    return array(
        'success' => true,
        'url' => $url
    );
}
    public function RincianbahanBarangMasuk(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/RincianBahanBarang.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function SPKirim(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/SPKirim.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function LPKirim(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/LPKirim.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function RekapPengadaanBarang(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/RekapPengadaanBarang.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function LPDKirim(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/LPDKirim.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function LP_sowodo(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/LP_SOWODO.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function LRPKirim(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/LRPKirim.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function LPKBB(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/logistics/LPKBB.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }



}
