<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class RptFormulir extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }

    public function AnalisaBJ(stdClass $params)
    {


        $this->reportfile = '/var/www/modules/reportcenter/report/Analisa/AnalisaBJ.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function AnalisaBB(stdClass $params)
    {


        $this->reportfile = '/var/www/modules/reportcenter/report/Analisa/AnalisaBB.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function AnalisaTB(stdClass $params)
    {


        $this->reportfile = '/var/www/modules/reportcenter/report/Analisa/AnalisaTB.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

}
