<?php
/*
 GaiaEHR (Electronic Health Records)
 User.php
 User dataProvider
 Copyright (C) 2012 Ernesto J. Rodriguez (Certun)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
if(!isset($_SESSION)){
    session_name('GaiaEHR');
    session_start();
    session_cache_limiter('private');
}
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class WorkOrder1
{

    /**
     * @var dbHelper
     */
    private $db;
    public $tmp=null;
    /**
     * @var
     */

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */

    /**
     * @param stdClass $params
     * @return stdClass
     */


    public function getWorkOrder1(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("SELECT * FROM viewdetailproduksi where co_id='$company' and pp_date between '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'
        and statusOrder='C' ORDER BY timeedit DESC");

        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function getWorkOrder1Detail(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("SELECT A.*, B.qty_bJ, C.qty_bb, B.qty_bJ - C.qty_bb as qty_susut
        from wo0 A
        left join(
            select co_id, wo_num, so_num, prod_id, sum(wo2.qty) as qty_bj from wo2
            group by co_id, wo_num, so_num, prod_id
        )B on A.co_id=B.co_id and A.wo_num=B.wo_num and A.so_num=B.so_num and A.prod_id=B.prod_id
        left join (
            select co_id, wo_num, so_num, prod_id, sum(wo1.total_qty_in) as qty_bb from wo1
            group by co_id, wo_num, so_num, prod_id
        )C on A.co_id=C.co_id and A.wo_num=C.wo_num and A.so_num=C.so_num and A.prod_id=C.prod_id
        where a.co_id='$company' and (A.so_num = '$params->so_num') and (A.no_ppd = '$params->no_ppd') and (A.prod_id = '$params->prod_id') ");

        $rows = array();
        //print_r($rows);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function getWorkOrder1DetailBBaku(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("select A.*, c.bb_nama
from wo1 A
left join bahanbaku C on A.bb_id=C.bb_id and a.co_id=c.co_id
where a.co_id='$company' and (a.prod_id = '$params->prod_id') and (a.so_num = '$params->so_num') and (a.wo_num = '$params->wo_num')");

        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }

    public function getWODetailBBdalamproses(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("select A.*, (A.qty * B.jml_paket) as qty_total, bb_nama, B.jml_paket
from wobahanbaku B
left join wodalamproses A on A.co_id=B.co_id and A.wo_num=B.wo_num and A.so_num=B.so_num and A.prod_id=B.prod_id and A.no_ppd=B.no_ppd
left join bahanbaku C on A.bb_id=C.bb_id
where b.co_id='$company' and (B.prod_id = '$params->prod_id') and (B.so_num = '$params->so_num') and (B.wo_num = '$params->wo_num') and B.bb_type='D' ");

        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }

    public function getWorkOrder1DetailBJadi(stdClass $params)
    {
        //error_reporting(-1);
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("select a.*, b.gudang_nama from wo2 a
left join gudang b on a.gudang_id=b.gudang_id and a.co_id=b.co_id
where co_id='$company' and (a.so_num = '$params->so_num') and (a.wo_num = '$params->wo_num') and (a.prod_id = '$params->prod_id') ");

        $rows = array();
        //print_r($rows);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function updateWorkOrder1(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'],$data['no_ppd'],$data['no_pp'],$data['so_num'],$data['cust_nama'],$data['qty'],$data['qty_produksi'],$data['formula_nama'],
        $data['formula_id'],$data['prod_id']
        ,$data['prod_nama'],$data['kemasan_nama'],$data['spesifikasi_nama'],$data['n'],$data['p2o5'],$data['k2o'],$data['cao'],$data['mgo'],$data['so4']
        ,$data['b'],$data['cu'],$data['zn'],$data['ah'],$data['af'],$data['est_finishdate'],$data['timeedit']);
        $sql = $this -> db -> sqlBind($data, 'pp_detailproduksi', 'U');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addWorkOrder1Detail(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id']);
        $sql = $this -> db -> sqlBind($data, 'wo0', 'I');
        $this -> db -> setSQL($sql);
       //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addWorkOrder1DetailBBaku(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['bb_type'] = 'B';
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id']);
        $sql = $this -> db -> sqlBind($data, 'wobahanbaku', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addWODetailBBdalamproses(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['bb_type'] = 'D';
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id']);
        $sql = $this -> db -> sqlBind($data, 'wobahanbaku', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addWorkOrder1DetailBJadi(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id']);
        $sql = $this -> db -> sqlBind($data, 'wo2', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function updateWorkOrder1Detail(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        unset($data['id'], $data['no_ppd'], $data['co_id'],$data['wo_num'],$data['qty_susut'],$data['qty_bb'],$data['qty_bj']);
        $sql = $this -> db -> sqlBind($data, 'wo0', 'U', array('no_ppd' => $params-> no_ppd, 'wo_num' => $params-> wo_num));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateWorkOrder1DetailBBaku(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['so_num'], $data['co_id'],$data['wo_num'],$data['sequence_no'], $data['prod_id'], $data['no_ppd']);
        $sql = $this -> db -> sqlBind($data, 'wobahanbaku', 'U', array('so_num' => $params-> so_num, 'wo_num' => $params-> wo_num,'prod_id' => $params-> prod_id,'bb_id' => $params-> bb_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateWorkOrder1DetailBJadi(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        unset($data['id'], $data['so_num'], $data['co_id'],$data['wo_num'],$data['prod_id'],$data['gudang_nama']);
        $sql = $this -> db -> sqlBind($data, 'wo2', 'U', array('so_num' => $params-> so_num, 'wo_num' => $params-> wo_num,'prod_id' => $params-> prod_id));
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteWO_NoFormula /*deleteWorkOrder1DetailBBaku*/(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM wo1 WHERE co_id='$company' and (so_num = '$params->so_num') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') and (bb_id = '$params->bb_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteWorkOrder1DetailBJadi(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM wo2 WHERE co_id='$company' and (so_num = '$params->so_num') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteWorkOrder1Detail(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM wobahanbaku WHERE co_id='$company' and (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wodalamproses WHERE co_id='$company' and (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo2 WHERE co_id='$company' and (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo1 WHERE co_id='$company' and (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo0 WHERE co_id='$company' and (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addWO_NoFormula(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id']);
        $sql = $this -> db -> sqlBind($data, 'wo1', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */


}

