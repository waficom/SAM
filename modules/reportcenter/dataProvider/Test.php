<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class Test extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }

    public function TestList(stdClass $params)
    {

        $this->reportfile = $_SESSION['root'] . '/modules/reportcenter/report/marketing/bs.jasper';
        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

}
