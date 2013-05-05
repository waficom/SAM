<?php
/*
 GaiaEHR (Electronic Health Records)
 Fees.php
 Fees dataProvider
 Copyright (C) 2012 Certun, Inc.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see
 <http://www.gnu.org/licenses/>
 .
 */

if (!isset($_SESSION))
{
    session_name("GaiaEHR");
    session_start();
    session_cache_limiter('private');
}

include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class GoodsIssued
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
    public function getFilterGIData(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$goodsissued = '';
        (int)$total = 0;
        (string)$sql = '';

//        error_reporting(-1);
        // Look between service date

        if ($params->datefrom && $params->dateto)
            $whereClause .= chr(13) . " AND gi0.tgl BETWEEN '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'" ;

        if ($params->so_numsearch)
            $whereClause .= chr(13) . " AND gi0.gi_num like '%" . $params->gi_numsearch . "%'";

        if ($params->cust_search)
            $whereClause .= chr(13) . " AND customer.cust_nama like '%" . $params->cust_search . "%'";

        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;

        $sql = "SELECT
                    gr0.co_id,
                    gr0.gr_num,
                    gr0.po_num,
                    gr0.tgl,
                    gr0.vend_id,
                    gr0.vend_id_trans,
                    gr0.keterangan,
                    vendor.vend_nama,
                    transportir.vend_nama as vend_tr_nama
                FROM gr0
                   left outer join vendor on (gr0.co_id = vendor.co_id) and (gr0.vend_id = vendor.vend_id)
                   left outer join vendor transportir on (gr0.co_id = transportir.co_id) and (gr0.vend_id_trans = transportir.vend_id)
				$whereClause
				ORDER BY
				     gr_num";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $goodsissued[] = $row;
        }

        $total = count($goodsissued);
//		$salesorder = array_slice($salesorder, $params->start, $params->limit);
//		echo $sql;
//		echo $salesorder;
        return array(
            'totals' => $total,
            'goodsissued' => $goodsissued
        );

    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addGI(stdClass $params)
    {
        $data = get_object_vars($params);

        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['vend_nama'],$data['vend_tr_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'gr0', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateGI(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['gi_num'], $data['id'], $data['cust_nama'], $data['co_id']);
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        $cond = array('co_id' =>$params->co_id, 'gi_num' => $params->gi_num);
        $sql = $this -> db -> sqlBind($data, 'gi0', 'U', $cond);
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
    public function deleteGI(stdClass $params)
    {
        $data = get_object_vars($params);
//        $sql = $this -> db -> sqlBind($data, 'company', 'U', array('co_id' => $params -> old_co_id));
        $sql = "DELETE FROM GI11 WHERE (co_id = '$params->co_id') and (gi_num = '$params->gi_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM GI10 WHERE (co_id = '$params->co_id') and (gi_num = '$params->gi_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM GI0 WHERE (co_id = '$params->co_id') and (gi_num = '$params->gi_num')";
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
    public function deletebygi_num($cid, $num)
    {
        $sql = "DELETE FROM GI11 WHERE (co_id = '$cid') and (gi_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM GI10 WHERE (co_id = '$cid') and (gi_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM GI0 WHERE (co_id = '$cid') and (gi_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $num;
    }

    public function getGIItems(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$giitems = '';
        (int)$total = 0;
        (string)$sql = '';

        // Look between service date

        $whereClause .= chr(13) . " AND gi10.co_id = '$params->co_id'";
        $whereClause .= chr(13) . " AND gi10.gi_num = '$params->gi_num'";


        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;
        $sql = "select
                    gi10.co_id,
                    gi10.gi_num,
                    gi10.prod_id,
                    gi10.sat_id,
                    gi10.qty_netto,
                    gi10.qty_pcs,
                    gi10.keterangan,
                    items.prod_nama,
                    satuan.satuan_nama
                from gr10
                   left outer join items on (gi10.co_id = items.co_id) and (gi10.bb_id = items.prod_id)
                   left outer join satuan on (gi10.co_id = satuan.co_id) and (gi10.sat_id = satuan.satuan_id)
                   $whereClause
				ORDER BY
				     bb_nama";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $giitems[] = $row;
        }

        $total = count($giitems);
        return array(
            'totals' => $total,
            'giitems' => $giitems
        );

    }
    public function addGIItems(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'gi10', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateGIItems(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $cond = array('co_id' =>$params->co_id, 'gi_num' => $params->gi_num, 'prod_id' => $params->prod_id);
        $sql = $this -> db -> sqlBind($data, 'gi10', 'U', $cond);
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
    public function deleteGIItems(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM GR10 WHERE gi_num = '$params->gi_num' AND co_id = '$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getGIDetail(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$gidtl = '';
        (int)$total = 0;
        (string)$sql = '';

        // Look between service date

        $whereClause .= chr(13) . " AND gi11.co_id = '$params->co_id' ";
        $whereClause .= chr(13) . " AND gi11.gi_num = '$params->gi_num' ";
        $whereClause .= chr(13) . " AND gi11.prod_id = '$params->prod_id' ";


        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;
        $sql = "select
                    gi11.co_id,
                    gi11.gi_num,
                    gi11.prod_id,
                    gi11.sat_id,
                    gi11.urut,
                    gi11.nopol,
                    gi11.sj_num,
                    gi11.qty_netto,
                    gi11.qty_pcs,
                    gi11.keterangan,
                    items.prod_nama,
                    satuan.satuan_nama
                from gr11
                   left outer join items on (gi11.co_id = items.co_id) and (gi11.prod_id = items.prod_id)
                   left outer join satuan on (gi11.co_id = satuan.co_id) and (gi11.sat_id = satuan.satuan_id)
                   $whereClause
				ORDER BY
				     urut";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $gidtl[] = $row;
        }

        $total = count($gidtl);
        return array(
            'totals' => $total,
            'gidtl' => $gidtl
        );

    }
    public function addGIDetail(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'gi11', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateGIDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['prod_nama'], $data['id'], $data['satuan_nama']);
        $cond = array('co_id' =>$params->co_id, 'gi_num' => $params->gi_num, 'prod_id' => $params->prod_id);
        $sql = $this -> db -> sqlBind($data, 'gi11', 'U', $cond);
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
    public function deleteGIDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM GI11 WHERE gi_num = '$params->gi_num' and co_id = '$params->co_id'
                and prod_id = '$params->prod_id' and urut = $params->urut";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}
