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
        $sql = "SELECT * FROM viewdeliveryorder
         where co_id='$params->co_id' and deliverydate between '" . substr($params->datefrom, 0, -9) . "' AND '" . substr($params->dateto, 0, -9) . "'  ORDER BY timeedit DESC";
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
//        error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['deliverydate'] = $this->db->Date_Converter($data['deliverydate']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['do_num'],$data['prod_nama'],$data['sat_id'],$data['gudang_nama'],$data['route_nama']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }

        $sql = $this -> db -> sqlBind($data, 'deliveryorder', 'I');
        $this -> db -> setSQL($sql);
          //print_r($sql);
        $this -> db -> execLog();
//        error_reporting(0);
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateDeliveryOrder(stdClass $params)
    {
        //error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['deliverydate'] = $this->db->Date_Converter($data['deliverydate']);
        unset($data['id'], $data['do_num'],$data['cust_nama'],$data['qty']
        ,$data['prod_nama'],$data['sat_id'],$data['gudang_nama'],$data['route_nama']);
        $sql = $this -> db -> sqlBind($data, 'deliveryorder', 'U', array('do_num' => $params-> do_num));
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteDeliveryOrder(stdClass $params)
    {
        $sql = "DELETE FROM deliveryorderdetai WHERE do_num = '$params->do_num'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM deliveryorder WHERE do_num = '$params->do_num'";
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
         WHERE do_num = '" . $params->do_num ."'ORDER BY timeedit DESC");

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
        // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        //$data['deliverydate'] = $this->db->Date_Converter($data['deliverydate']);
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



}

