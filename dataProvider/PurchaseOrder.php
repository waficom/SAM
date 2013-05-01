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

class PurchaseOrder
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
    public function getFilterPOData(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$purchaseorder = '';
        (int)$total = 0;
        (string)$sql = '';

//        error_reporting(-1);
        // Look between service date

        if ($params->datefrom && $params->dateto)
//			$whereClause .= chr(13) . " AND so0.tanggal BETWEEN '" . substr($params->datefrom, 0, -9) . " 00:00:00' AND '" . substr($params->dateto, 0, -9) . " 23:59:59'";
            $whereClause .= chr(13) . " AND po0.tgl BETWEEN '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'" ;

        if ($params->po_numsearch)
            $whereClause .= chr(13) . " AND po0.po_num like '%" . $params->po_numsearch . "%'";

        if ($params->vend_search)
            $whereClause .= chr(13) . " AND vendor.vend_nama like '%" . $params->vend_search . "%'";

        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;

        $sql = "SELECT po0.*, vendor.vend_nama
				FROM
					po0
				LEFT JOIN
					vendor
				ON vendor.vend_id = po0.vend_id
				$whereClause
				ORDER BY
				     po_num";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $purchaseorder[] = $row;
        }

        $total = count($purchaseorder);
//		$salesorder = array_slice($salesorder, $params->start, $params->limit);
//		echo $sql;
//		echo $salesorder;
        return array(
            'totals' => $total,
            'purchaseorder' => $purchaseorder
        );

    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addPO(stdClass $params)
    {
        $data = get_object_vars($params);

        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        if (is_null($data['ppn_po']) || ($data['ppn_po'] == '')) {
            $data['ppn_po'] = '0';
        }
        if (is_null($data['ppn_exc']) || ($data['ppn_exc'] == '')) {
            $data['ppn_exc'] = '0';
        }

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['vend_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'po0', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatePO(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['so_num'], $data['id'], $data['cust_nama'], $data['co_id']);
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        $data['tgl_jt'] = $this->db->Date_Converter($data['tgl_jt']);
        if (is_null($data['ppn_po']) || ($data['ppn_po'] == '')) {
            $data['ppn_po'] = '0';
        }
        if (is_null($data['ppn_exc']) || ($data['ppn_exc'] == '')) {
            $data['ppn_exc'] = '0';
        }
        $cond = array('co_id' =>$params->co_id, 'po_num' => $params->so_num);
        $sql = $this -> db -> sqlBind($data, 'po0', 'U', $cond);
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
    public function deletePO(stdClass $params)
    {
        $data = get_object_vars($params);
//        $sql = $this -> db -> sqlBind($data, 'company', 'U', array('co_id' => $params -> old_co_id));
        $sql = "DELETE FROM PO1 WHERE (co_id = '$params->co_id') and (po_num = '$params -> po_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM PO0 WHERE (co_id = '$params->co_id') and (po_num = '$params -> po_num')";
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
    public function deletebypo_num($cid, $num)
    {
        $sql = "DELETE FROM PO1 WHERE (co_id = '$cid') and (po_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM PO0 WHERE (co_id = '$cid') and (po_num = '$num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $num;
    }

    public function getPOItems(stdClass $params)
    {
        // Declare all the variables that we are going to use.
        (string)$whereClause = '';
        (array)$soitems = '';
        (int)$total = 0;
        (string)$sql = '';

        // Look between service date

        $whereClause .= chr(13) . " AND po1.co_id = '" . $params->co_id . "'";
        $whereClause .= chr(13) . " AND po1.po_num = '" . $params->po_num . "'";


        // Eliminate the first 6 characters of the where clause
        // this to eliminate and extra AND from the SQL statement
        $whereClause = substr($whereClause, 6);

        // If the whereClause variable is used go ahead and
        // and add the where command.
        if ($whereClause)
            $whereClause = 'WHERE ' . $whereClause;
        $sql = "select
                    po1.co_id,
                    po1.po_num,
                    po1.bb_id,
                    po1.sat_id,
                    po1.qty,
                    po1.hrg,
                    po1.n_brutto,
                    po1.disc_prs,
                    po1.n_disc,
                    po1.n_netto,
                    po1.qty_rcv,
                    po1.keterangan,
                    bahanbaku.bb_nama,
                    satuan.satuan_nama
                from po1
                   left outer join bahanbaku on (po1.bb_id = bahanbaku.bb_id) and (po1.co_id = bahanbaku.co_id)
                   left outer join satuan on (po1.co_id = satuan.co_id) and (po1.sat_id = satuan.satuan_id)
                   $whereClause
				ORDER BY
				     prod_nama";
        $this->db->setSQL($sql);

        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $poitems[] = $row;
        }

        $total = count($poitems);
        return array(
            'totals' => $total,
            'poitems' => $poitems
        );

    }
    public function addPOItems(stdClass $params)
    {
        $data = get_object_vars($params);

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['bb_nama'], $data['id'], $data['satuan_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'po1', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatePOItems(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['bb_nama'], $data['id'], $data['satuan_nama']);
        $cond = array('co_id' =>$params->co_id, 'po_num' => $params->so_num, 'bb_id' => $params->bb_id);
        $sql = $this -> db -> sqlBind($data, 'po1', 'U', $cond);
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
    public function deletePOItems(stdClass $params)
    {
        $data = get_object_vars($params);
        $sql = "DELETE FROM PO1 WHERE (co_id='$params-co_id') and (po_num = '$params->po_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}
