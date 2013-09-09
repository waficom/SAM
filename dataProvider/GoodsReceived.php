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

class GoodsReceived
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
    public function getFilterGRData(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$goodsreceived = '';
        (int)$total = 0;
        (string)$sql = '';

//        error_reporting(-1);
        // Look between service date

        if ($params->datefrom && $params->dateto)
            $whereClause .= chr(13) . " AND gr0.tgl BETWEEN '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'" ;

        if ($params->gr_numsearch)
            $whereClause .= chr(13) . " AND gr0.gr_num like '%" . $params->gr_numsearch . "%'";

        if ($params->cust_search)
            $whereClause .= chr(13) . " AND vendor.vend_nama like '%" . $params->vend_search . "%'";

        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;

        $sql = "SELECT
                    gr0.*,
                    vendor.vend_nama,
                    transportir.vend_nama as vend_tr_nama, gudang.gudang_nama, --coa.coa_nama as account_nama,
                    case gr0.gr_type when 'R' then 'Received' else 'Return' end as gr_type_desc
                FROM gr0
                   left outer join vendor on (gr0.co_id = vendor.co_id) and (gr0.vend_id = vendor.vend_id)
                   left outer join vendor transportir on (gr0.co_id = transportir.co_id) and (gr0.vend_id_trans = transportir.vend_id)
                   left join gudang on gr0.gudang_id=gudang.gudang_id and gr0.co_id=gudang.co_id
                    --left join coa on gr0.account.coa.coa_id and gr0.co_id=coa.co_id
				$whereClause
				ORDER BY
				     gr0.timeedit DESC";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $goodsreceived[] = $row;
        }

        $total = count($goodsreceived);
//		$salesorder = array_slice($salesorder, $params->start, $params->limit);
//		echo $sql;
//		echo $salesorder;
        return array(
            'totals' => $total,
            'goodsreceived' => $goodsreceived
        );

    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addGR(stdClass $params)
    {
        $data = get_object_vars($params);

        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['vend_nama'],$data['vend_tr_nama'], $data['gr_type_desc'], $data['gudang_nama'], $data['account_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this -> db -> sqlBind($data, 'gr0', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateGR(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['gr_num'], $data['id'], $data['vend_nama'], $data['co_id'], $data['vend_tr_nama'], $data['gr_type_desc'], $data['gudang_nama'], $data['account_nama']);
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $cond = array('co_id' =>$params->co_id, 'gr_num' => $params->gr_num);
        $sql = $this -> db -> sqlBind($data, 'gr0', 'U', $cond);
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
    public function deleteGR(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE (co_id = '$params->co_id') and (inv_code = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM gr11 WHERE (co_id = '$params->co_id') and (gr_num = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM gr10 WHERE (co_id = '$params->co_id') and (gr_num = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM gr0 WHERE (co_id = '$params->co_id') and (gr_num = '$params->gr_num')";
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

    public function getGRItems(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$gritems = '';
        (int)$total = 0;
        (string)$sql = '';

        // Look between service date

        $whereClause .= chr(13) . " AND gr10.co_id = '$params->co_id'";
        $whereClause .= chr(13) . " AND gr10.gr_num = '$params->gr_num'";


        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;
        $sql = "select
                    gr10.co_id,
                    gr10.gr_num,
                    gr10.bb_id,
                    gr10.sat_id,
                    gr10.qty_brutto,
                    gr10.qty_netto,
                    gr10.qty_pcs,
                    gr10.qty_brutto -  gr10.qty_netto  as qty_selisih,
                    gr10.keterangan,
                    bahanbaku.bb_nama,
                    satuan.satuan_nama as sat_nama,
                    A.qty_po
                from gr10
                   left outer join bahanbaku on (gr10.co_id = bahanbaku.co_id) and (gr10.bb_id = bahanbaku.bb_id)
                   left outer join satuan on (gr10.co_id = satuan.co_id) and (gr10.sat_id = satuan.satuan_id)
                   left join gr0 on gr10.gr_num=gr0.gr_num and gr10.co_id=gr0.co_id
                   left join (select co_id, po_num, bb_id, sum(qty) as qty_po from po1 group by po_num, co_id, bb_id) A on gr0.po_num=A.po_num and gr0.co_id=A.co_id and gr10.bb_id=A.bb_id
                   $whereClause
				ORDER BY
				     bb_nama";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $gritems[] = $row;
        }

        $total = count($gritems);
        return array(
            'totals' => $total,
            'gritems' => $gritems
        );

    }
    public function addGRItems(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['bb_nama'], $data['id'], $data['sat_nama'], $data['old_bb_id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'gr10', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateGRItems(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['bb_nama'], $data['id'], $data['sat_nama'], $data['qty_po'], $data['old_bb_id']);
        $cond = array('co_id' =>$params->co_id, 'gr_num' => $params->gr_num, 'bb_id' => $params->old_bb_id);
        $sql = $this -> db -> sqlBind($data, 'gr10', 'U', $cond);
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
    public function deleteGRItems(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM GR10 WHERE gr_num = '$params->gr_num' AND co_id = '$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getGRDetail(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'urut';
        }
        $sql = "select * from gr11 WHERE gr_num = '$params->gr_num' AND co_id = '$params->co_id' and  bb_id = '$params->bb_id' and  sat_id = '$params->sat_id'
				ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function addGRDetail(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'gr11', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateGRDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['bb_id'], $data['urut'], $data['gr_num']);
        $cond = array('co_id' =>$params->co_id, 'gr_num' => $params->gr_num, 'bb_id' => $params->bb_id, 'urut' => $params->urut);
        $sql = $this -> db -> sqlBind($data, 'gr11', 'U', $cond);

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
    public function deleteGRDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM GR11 WHERE gr_num = '$params->gr_num' and co_id = '$params->co_id'
                and bb_id = '$params->bb_id' and sat_id = '$params->sat_id' and urut = " . $params->urut;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


}
