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

class DeliveryOrder
{

    /**
     * @var dbHelper
     */
    private $db;
    /**
     * @var
     */

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }



    public function getDeliveryOrder(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM viewdeliveryorder
         where co_id='$company' ORDER BY timeedit DESC";
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
    public function addDeliveryOrder(stdClass $params)
    {
        /*$co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $this->db->setSQL("execute procedure DELIVERYORDER_I '$userinput','$useredit','$co_id','N'");
        $this->db->execOnly();*/
        // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['deliverydate'] = $this->db->Date_Converter($data['deliverydate']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['prod_nama'],$data['cust_nama'],$data['qty']);
        if($params->status=='true'){
            $data['status'] = '1';
        }else{
            $data['status'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'deliveryorder', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function addDeliveryOrderReturn()
    {
        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $this->db->setSQL("execute procedure DELIVERYORDER_I '$userinput','$useredit','$co_id','R'");
        $this->db->execOnly();
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateDeliveryOrder(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['deliverydate'] = $this->db->Date_Converter($data['deliverydate']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['do_num'],$data['cust_nama'],$data['qty'],$data['prod_nama']);
        if($params->status=='true'){
            $data['status'] = '1';
        }else{
            $data['status'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'deliveryorder', 'U', array('co_id' => $params-> co_id,'do_num' => $params-> do_num));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updateDeliveryOrderPosting(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $do_num=$params->do_num;
        $tglposting = $this->db->Date_Converter($params-> posted_date);
        $useredit = $_SESSION['user']['name'];
        $sql = "execute procedure DELIVERYORDER_P '$tglposting','$useredit','$do_num','$co_id' ";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;

    }

    public function deleteDeliveryOrder(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE co_id='$params->co_id' and inv_code = '$params->do_num'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM doloc WHERE co_id='$params->co_id' and do_num = '$params->do_num'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM deliveryorderdetai WHERE co_id='$params->co_id' and do_num = '$params->do_num'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM deliveryorder WHERE co_id='$params->co_id' and do_num = '$params->do_num'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getDeliveryOrder1(stdClass $params)
    {
        //error_reporting(-1);
        $this->db->setSQL("SELECT A.*, B.prod_nama, C.vend_nama FROM deliveryorderdetai A
        left join items B on A.co_id=B.co_id and A.prod_id=B.prod_id
        left join vendor C on A.vend_id=C.vend_id and A.co_id=C.co_id
         WHERE do_num = '" . $params->do_num ."'ORDER BY sequence_no ASC");

        $rows = array();
        //print_r($rows);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }

    public function addDeliveryOrder1(stdClass $params)
    {
        // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        //$data['deliverydate'] = $this->db->Date_Converter($data['deliverydate']);
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['prod_nama']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }

        $sql = $this -> db -> sqlBind($data, 'deliveryorderdetai', 'I');
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateDeliveryOrder1(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['do_num'], $data['old_sequence_no'], $data['sequence_no'], $data['prod_nama'], $data['vend_nama']);
        $sql = $this -> db -> sqlBind($data, 'deliveryorderdetai', 'U', array('do_num' => $params-> do_num, 'sequence_no' => $params-> sequence_no));
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteDeliveryOrder1(stdClass $params)
    {
        $sql = "DELETE FROM deliveryorderdetai WHERE (do_num = '$params->do_num') and (sequence_no = '$params->sequence_no')   ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getDOLoc(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.status FROM DOLoc a
        left join deliveryorder b on a.co_id=b.co_id and a.do_num=b.do_num and a.cust_id=b.cust_id
         where a.co_id='$company' and a.do_num='$params->do_num' and a.cust_id='$params->cust_id'  ORDER BY custloc_id ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function updateDOLoc(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id'],$data['status']);
        $sql = $this -> db -> sqlBind($data, 'DOLoc', 'U', array('cust_id' => $params-> cust_id,'do_num' => $params-> do_num, 'co_id' => $params-> co_id, 'custloc_id' => $params-> custloc_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }



}

