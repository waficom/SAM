<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class Staff_Rpt extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }


    public function Karyawan(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/Staff/Staff.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

}
