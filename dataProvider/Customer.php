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
class Customer
{

	/**
	 * @var dbHelper
	 */
	private $db;
	/**
	 * @var
	 */
	private $id;

	function __construct()
	{
		$this->db = new dbHelper();
		return;
	}

    public function getCustLiveSearch(stdClass $params)
	{
        $sql = "SELECT co_id,
                      cust_id,
                      cust_nama
                FROM customer
                WHERE UPPER(cust_id) LIKE UPPER('%$params->query%')
                   OR UPPER(cust_nama) LIKE UPPER('%$params->query%')";
		$this->db->setSQL($sql);
        $records = $this->db->fetchRecords(PDO::FETCH_ASSOC);
        foreach ($records as $key => $value)
        {
            if (is_array($value))
            {
                $records[$key] = array_change_key_case($value);
            }
        }
		$total   = count($records);
		$records = array_slice($records, $params->start, $params->limit);
		return array(
			'totals' => $total,
			'rows'   => $records
		);
	}

	public function getcustomer(stdClass $params)
	{
		$sql = "SELECT * FROM customer ORDER BY cust_id";
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
	public function addcustomer(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['id'], $data['old_cust_id']);
		foreach($data as $key => $val){
			if($val == null || $val == ''){
				unset($data[$key]);
			}
		}
		$data['co_id'] = $_SESSION['user']['site'];		
		$sql = $this->db->sqlBind($data, 'customer', 'I');
        error_reporting(-1);
		$this->db->setSQL($sql);
		$this->db->execLog();
        print_r($sql);

//		$params->id = $this->id = $this->db->lastInsertId;
        error_reporting(0);
        return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updatecustomer(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['cust_id'], $data['old_cust_id'], $data['id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
		$sql = $this->db->sqlBind($data, 'customer', 'U', array('cust_id' => $params->old_cust_id));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deletecustomer(stdClass $params)
	{
		$sql = "DELETE FROM customer WHERE (co_id = '$params->co_id') and (cust_id = '$params->cust_id')";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
    public function getcustomerL(stdClass $params)
    {
        //error_reporting(-1);
        $this->db->setSQL("SELECT *
                         FROM customer_location
                    WHERE cust_id = '$params->cust_id' ORDER BY location_id ASC");

        $rows = array();
        //print_r($rows);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }

    public function addcustomerL(stdClass $params)
    {
        // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['location_id']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'customer_location', 'I');
        $this -> db -> setSQL($sql);
       // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatecustomerL(stdClass $params)
    {
        // error_reporting(-1);
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['cust_id'], $data['old_location_id']);
        $sql = $this -> db -> sqlBind($data, 'customer_location', 'U', array('location_id' => $params-> old_location_id));
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deletecustomerL(stdClass $params)
    {
        $sql = "DELETE FROM customer_location WHERE (cust_id = '$params->cust_id') and (location_id = '$params->location_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
	
}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
