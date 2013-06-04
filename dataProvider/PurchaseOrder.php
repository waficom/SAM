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
        $sql = "SELECT po0.*, vendor.vend_nama
				FROM
					po0
				LEFT JOIN
					vendor
				ON vendor.vend_id = po0.vend_id
				where po0.tgl between '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'
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
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        $data['tgl_jt'] = $this->db->Date_Converter($data['tgl_jt']);
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
        unset($data['po_num'], $data['id'], $data['cust_nama'], $data['co_id'], $data['vend_nama']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        $data['tgl_jt'] = $this->db->Date_Converter($data['tgl_jt']);
        if (is_null($data['ppn_po']) || ($data['ppn_po'] == '')) {
            $data['ppn_po'] = '0';
        }
        if (is_null($data['ppn_exc']) || ($data['ppn_exc'] == '')) {
            $data['ppn_exc'] = '0';
        }
        $cond = array('co_id' =>$params->co_id, 'po_num' => $params->po_num);
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
                  WHERE po_num = '" . $params->po_num ."'
				";
        $this->db->setSQL($sql);
       // print_r($sql);

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
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['bb_nama'], $data['id'], $data['satuan_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'po1', 'I');
        $this -> db -> setSQL($sql);
       // print_r($sql);
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
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['bb_nama'], $data['id'], $data['satuan_nama'],$data['old_bb_id']);
        $cond = array('co_id' =>$params->co_id, 'po_num' => $params->po_num, 'bb_id' => $params->bb_id);
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
