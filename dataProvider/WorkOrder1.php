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
        //error_reporting(-1);
        $this->db->setSQL("SELECT * FROM VIEWDETAILPRODUKSI where status='C' ORDER BY timeedit DESC");

        $rows = array();
        //print_r($rows);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function getWorkOrder1Detail(stdClass $params)
    {
        $this->db->setSQL("SELECT * FROM wo0 where (no_ppd = '$params->no_ppd') ");

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
        //error_reporting(-1);
        $this->db->setSQL("SELECT * FROM wo1 where (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') ");

        $rows = array();
        //print_r($rows);
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
        $this->db->setSQL("SELECT * FROM wo2 where (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') ");

        $rows = array();
        //print_r($rows);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function getGudanglocation(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }

        $sql = "select * from gudang A
                where A.pabrik_sequence = (
                select D.pabrik_sequence from wo2 B
                left join pp_detailproduksi C on B.no_ppd=C.no_ppd
                left join pp_produksi D on C.no_pp=D.no_pp
                where B.no_ppd='2/PPD/SAM') ORDER BY $orderx";
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

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
       // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addWorkOrder1DetailBBaku(stdClass $params)
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
        unset($data['id'],$data['sequence_no']);
        $sql = $this -> db -> sqlBind($data, 'wo1', 'I');
        $this -> db -> setSQL($sql);
        //print_r($sql);
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
        unset($data['id'],$data['sequence_no']);
        $sql = $this -> db -> sqlBind($data, 'wo2', 'I');
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function updateWorkOrder1Detail(stdClass $params)
    {
        //error_reporting(-1);
        $data = get_object_vars($params);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['tgl'] = $this->db->Date_Converter($data['tgl']);
        unset($data['id'], $data['no_ppd'], $data['co_id'],$data['wo_num']);
        $sql = $this -> db -> sqlBind($data, 'wo0', 'U', array('no_ppd' => $params-> no_ppd, 'wo_num' => $params-> wo_num));
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateWorkOrder1DetailBBaku(stdClass $params)
    {
        //error_reporting(-1);
        $data = get_object_vars($params);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['no_ppd'], $data['co_id'],$data['wo_num'],$data['sequence_no']);
        $sql = $this -> db -> sqlBind($data, 'wo1', 'U', array('no_ppd' => $params-> no_ppd, 'wo_num' => $params-> wo_num,'sequence_no' => $params-> sequence_no));
        $this -> db -> setSQL($sql);
       // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateWorkOrder1DetailBJadi(stdClass $params)
    {
        //error_reporting(-1);
        $data = get_object_vars($params);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['no_ppd'], $data['co_id'],$data['wo_num'],$data['sequence_no'],$data['gudang_nama']);
        $sql = $this -> db -> sqlBind($data, 'wo2', 'U', array('no_ppd' => $params-> no_ppd, 'wo_num' => $params-> wo_num,'sequence_no' => $params-> sequence_no));
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteWorkOrder1DetailBBaku(stdClass $params)
    {
        $sql = "DELETE FROM wo1 WHERE (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') and (sequence_no = '$params->sequence_no') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteWorkOrder1DetailBJadi(stdClass $params)
    {
        $sql = "DELETE FROM wo2 WHERE (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') and (sequence_no = '$params->sequence_no') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function deleteWorkOrder1Detail(stdClass $params)
    {
        $sql = "DELETE FROM wo2 WHERE (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo1 WHERE (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wo0 WHERE (no_ppd = '$params->no_ppd') and (wo_num = '$params->wo_num') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */


}

