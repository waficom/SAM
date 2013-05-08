<?php

if (!isset($_SESSION))
{
    session_name("GaiaEHR");
    session_start();
    session_cache_limiter('private');
}

include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class WorkOrder
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
    public function getFilterWOData(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$workorder = '';
        (int)$total = 0;
        (string)$sql = '';

//        error_reporting(-1);
        // Look between service date

        if ($params->datefrom && $params->dateto)
            $whereClause .= chr(13) . " AND wo0.tgl BETWEEN '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'" ;

        if ($params->so_numsearch)
            $whereClause .= chr(13) . " AND wo0.wo_num like '%" . $params->wo_numsearch . "%'";

        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;

        $sql = "SELECT
                    wo0.co_id,
                    wo0.wo_num,
                    wo0.tgl,
                    wo0.shift,
                    wo0.ka_shift,
                    wo0.keterangan
                FROM wo0
				$whereClause
				ORDER BY
				     wo_num";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $workorder[] = $row;
        }

        $total = count($workorder);
//		$salesorder = array_slice($salesorder, $params->start, $params->limit);
//		echo $sql;
//		echo $salesorder;
        return array(
            'totals' => $total,
            'workorder' => $workorder
        );

    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addWO(stdClass $params)
    {
        $data = get_object_vars($params);

        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['cust_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'wo0', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateWO(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['wo_num'], $data['id'], $data['co_id']);
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        $cond = array('co_id' =>$params->co_id, 'wo_num' => $params->wo_num);
        $sql = $this -> db -> sqlBind($data, 'wo0', 'U', $cond);
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $params->old_co_id = $params->co_id;
        return $params;
    }

    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteWO(stdClass $params)
    {
        $data = get_object_vars($params);
//        $sql = $this -> db -> sqlBind($data, 'company', 'U', array('co_id' => $params -> old_co_id));
        $sql = "DELETE FROM WO2 WHERE (co_id = '$params->co_id') and (wo_num = '$params->wo_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM WO1 WHERE (co_id = '$params->co_id') and (wo_num = '$params->wo_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM WO0 WHERE (co_id = '$params->co_id') and (wo_num = '$params->wo_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deletebywo_num($cid, $num)
    {
        $sql = "DELETE FROM WO2 WHERE (co_id = '$cid') and (wo_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM WO1 WHERE (co_id = '$cid') and (wo_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM WO0 WHERE (co_id = '$cid') and (wo_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $num;
    }

    public function getWObb(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$wobb = '';
        (int)$total = 0;
        (string)$sql = '';

        // Look between service date

        $whereClause .= chr(13) . " AND wo1.co_id = '$params->co_id'";
        $whereClause .= chr(13) . " AND wo1.wo_num = '$params->wo_num'";


        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;
        $sql = "select
                    wo1.co_id,
                    wo1.wo_num,
                    wo1.bb_id,
                    wo1.bb_nama,
                    wo1.sat_id,
                    wo1.sat_nama,
                    wo1.qty_stock,
                    wo1.qty_in,
                    wo1.qty_out,
                    wo1.qty_last,
                    wo1.keterangan,
                    bahanbaku.bb_nama,
                    satuan.satuan_nama
                from wo1
                   left outer join bahanbaku on (wo1.co_id = items.co_id) and (wo1.bb_id = bahanbaku.bb_id)
                   left outer join satuan on (wo1.co_id = satuan.co_id) and (wo1.sat_id = satuan.satuan_id)
                   $whereClause
				ORDER BY
				     bb_nama";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $wobb[] = $row;
        }

        $total = count($wobb);
        return array(
            'totals' => $total,
            'wobb' => $wobb
        );

    }
    public function addWObb(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'], $data['satuan_nama'], $data['bb_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'wo1', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateWObb(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['bb_nama'], $data['id'], $data['satuan_nama']);
        $cond = array('co_id' =>$params->co_id, 'wo_num' => $params->wo_num, 'bb_id' => $params->bb_id);
        $sql = $this -> db -> sqlBind($data, 'wo1', 'U', $cond);
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $params->old_co_id = $params->co_id;
        return $params;
    }

    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteWObb(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM wo1 WHERE bb_id = '$params->bb_id' and wo_num = '$params->wo_num' AND co_id = '$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getWOItems(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$woitems = '';
        (int)$total = 0;
        (string)$sql = '';

        // Look between service date

        $whereClause .= chr(13) . " AND wo2.co_id = '$params->co_id' ";
        $whereClause .= chr(13) . " AND wo2.wo_num = '$params->wo_num' ";


        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;
        $sql = "select
                    wo2.co_id,
                    wo2.wo_num,
                    wo2.prod_id,
                    wo2.sat_id,
                    wo2.qty,
                    wo2.qty_pcs,
                    wo2.keterangan,
                    items.prod_nama,
                    satuan.satuan_nama
                from wo2
                   left outer join items on (wo2.co_id = items.co_id) and (wo2.prod_id = items.prod_id)
                   left outer join satuan on (wo2.co_id = satuan.co_id) and (wo2.sat_id = satuan.satuan_id)
                   $whereClause
				ORDER BY
				     prod_nama";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $woitems[] = $row;
        }

        $total = count($woitems);
        return array(
            'totals' => $total,
            'woitems' => $woitems
        );

    }
    public function addWOItems(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'wo2', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateWOItems(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $cond = array('co_id' =>$params->co_id, 'wo_num' => $params->wo_num, 'prod_id' => $params->prod_id);
        $sql = $this -> db -> sqlBind($data, 'wo2', 'U', $cond);
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $params->old_co_id = $params->co_id;
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteWOItems(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM wo2 WHERE wo_num = '$params->wo_num' and co_id = '$params->co_id'
                and prod_id = '$params->prod_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}
