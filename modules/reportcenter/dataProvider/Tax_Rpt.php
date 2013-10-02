<?php
if (!isset($_SESSION))
{
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ('Reports.php');

class Tax_Rpt extends Reports
{
    /*
     * The first thing all classes do, the construct.
     */
    function __construct()
    {
        parent::__construct();
        return;
    }


    public function Tax_in(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/Tax/Pajak_Masukan.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }
    public function Tax_out(stdClass $params)
    {
        $this->reportfile = '/var/www/modules/reportcenter/report/Tax/Pajak_Keluaran.jasper';

        $url = $this->report_execute($params->params);
        return array(
            'success' => true,
            'url' => $url
        );
    }

}
