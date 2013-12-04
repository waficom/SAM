<?php

if (!isset($_SESSION))
{
    session_name("GaiaEHR");
    session_start();
    session_cache_limiter('private');
}

$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class SP_Kirim
{
    /**
     * @var dbHelper
     */
    private $db;

    function __construct()
    {
        // Declare all the variables that we are gone to use
        // within the class.
        (object)$this->db = new dbHelper();
        return;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getSP_Kirim(stdClass $params)
    {
        $wherex = "co_id = '" . $_SESSION['user']['site'] . "'";

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $sql = "SELECT * FROM sp_kirim WHERE $wherex ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;


    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addSP_Kirim(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['co_id'] = $_SESSION['user']['site'];
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['perkiraan_muat'] = $this->db->Date_Converter($data['perkiraan_muat']);
        $sql = $this -> db -> sqlBind($data, 'sp_kirim', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateSP_Kirim(stdClass $params)
    {
        $data = get_object_vars($params);
        $co_id = $_SESSION['user']['site'] ;
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id'], $data['sequence_no']);
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['perkiraan_muat'] = $this->db->Date_Converter($data['perkiraan_muat']);
        $sql = $this -> db -> sqlBind($data, 'sp_kirim', 'U', array('co_id' => $co_id,'sequence_no' => $params -> sequence_no));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteSP_Kirim(stdClass $params)
    {
        $sql = "DELETE FROM sp_kirim WHERE (co_id = '$params->co_id') and (sequence_no = '$params->sequence_no')";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getSP_Kirim_Detail(stdClass $params)
    {
        $wherex = "co_id = '" . $_SESSION['user']['site'] . "'";

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'no_urut';
        }
        $sql = "SELECT * FROM sp_kirim_detail WHERE nosurat='$params->nosurat' and $wherex ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;


    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addSP_Kirim_Detail(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }

        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'sp_kirim_detail', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateSP_Kirim_Detail(stdClass $params)
    {
        $data = get_object_vars($params);
        $co_id = $_SESSION['user']['site'] ;
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id'], $data['no_urut'], $data['nosurat']);
        $sql = $this -> db -> sqlBind($data, 'sp_kirim_detail', 'U', array('co_id' => $co_id, 'nosurat' => $params -> nosurat, 'no_urut' => $params -> no_urut));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteSP_Kirim_Detail(stdClass $params)
    {
        $sql = "DELETE FROM sp_kirim_detail WHERE (co_id = '$params->co_id') and (nosurat = '$params->nosurat') and (no_urut = '$params->no_urut')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}