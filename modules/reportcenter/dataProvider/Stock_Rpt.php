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
}
