<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class Stock_Rpt extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }


    public function StockBB(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/Management_Stock/StockBB.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function StockDetailBB(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/Management_Stock/StockDetailBB.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function StockBDP(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/Management_Stock/StockBDP.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function StockBJ(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/Management_Stock/StockBJ.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function StockDetailBJ(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/Management_Stock/StockDetailBJ.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function RincianMasukBJ(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/GL/RincianMasukBJ.jasper';
        $this->lokasirpt = '/var/www/modules/reportcenter/report/GL/';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function RincianKeluarBJ(stdClass $params)
    {

        $this->reportfile = '/var/www/modules/reportcenter/report/GL/RincianKlwrBJ.jasper';
        $this->lokasirpt = '/var/www/modules/reportcenter/report/GL/';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
}
