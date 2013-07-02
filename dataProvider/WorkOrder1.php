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
        $this->db->setSQL("SELECT * FROM viewdetailproduksi where pp_date between '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'
        and status='C' ORDER BY timeedit DESC");

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
        $this->db->setSQL("SELECT * FROM wo0 where (so_num = '$params->so_num') and (no_ppd = '$params->no_ppd') and (prod_id = '$params->prod_id') ");

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
        $this->db->setSQL("select A.*, (A.qty_in * B.jml_paket) as qty_total, bb_nama, B.jml_paket
from wobahanbaku B
left join wo1 A on A.co_id=B.co_id and A.wo_num=B.wo_num and A.so_num=B.so_num and A.prod_id=B.prod_id and A.no_ppd=B.no_ppd
left join bahanbaku C on A.bb_id=C.bb_id
where (B.prod_id = '$params->prod_id') and (B.so_num = '$params->so_num') and (B.wo_num = '$params->wo_num') ");

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
        $this->db->setSQL("select a.*, b.gudang_nama from wo2 a
left join gudang b on a.gudang_id=b.gudang_id and a.co_id=b.co_id where (a.so_num = '$params->so_num') and (a.wo_num = '$params->wo_num') and (a.prod_id = '$params->prod_id') ");

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

        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'],$data['no_ppd'],$data['no_pp'],$data['so_num'],$data['cust_nama'],$data['qty'],$data['qty_produksi'],$data['formula_nama'],
        $data['formula_id'],$data['prod_id']
        ,$data['prod_nama'],$data['kemasan'],$data['spesifikasi_nama'],$data['n'],$data['p2o5'],$data['k2o'],$data['cao'],$data['mgo'],$data['so4']
        ,$data['b'],$data['cu'],$data['zn'],$data['ah'],$data['af'],$data['est_finishdate'],$data['timeedit']);
        $sql = $this -> db -> sqlBind($data, 'wo0', 'U');
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
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function updateWorkOrder1Detail(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['name'];
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        unset($data['id'], $data['no_ppd'], $data['co_id'],$data['wo_num']);
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

    public function deleteWorkOrder1DetailBBaku(stdClass $params)
    {
        $sql = "DELETE FROM wo1 WHERE (so_num = '$params->so_num') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') and (bb_id = '$params->bb_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteWorkOrder1DetailBJadi(stdClass $params)
    {
        $sql = "DELETE FROM wo2 WHERE (so_num = '$params->so_num') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteWorkOrder1Detail(stdClass $params)
    {
        $sql = "DELETE FROM wo2 WHERE (so_num = '$params->so_num') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo1 WHERE (so_num = '$params->so_num') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo0 WHERE (so_num = '$params->so_num') and (wo_num = '$params->wo_num') and (prod_id = '$params->prod_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */


}

