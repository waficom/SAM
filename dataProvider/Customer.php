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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT co_id,
                      cust_id,
                      cust_nama
                FROM customer
                WHERE co_id='$company' and UPPER(cust_id) LIKE UPPER('%$params->query%')
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
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM customer where co_id='$company' ORDER BY cust_id";
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
		$this->db->setSQL($sql);
		$this->db->execLog();
        return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updatecustomer(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
		$data = get_object_vars($params);
        unset($data['cust_id'], $data['old_cust_id'], $data['id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
		$sql = $this->db->sqlBind($data, 'customer', 'U', array('cust_id' => $params->cust_id, 'co_id' => $company));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deletecustomer(stdClass $params)
	{
        $sql = "DELETE FROM customer_locations WHERE (co_id = '$params->co_id') and (cust_id = '$params->cust_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
        $sql = "DELETE FROM customer WHERE (co_id = '$params->co_id') and (cust_id = '$params->cust_id')";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
    public function getCustLoc(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM customer_locations where co_id='$company' and cust_id='$params->cust_id' ORDER BY custloc_id";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }

    public function addCustLoc(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'customer_locations', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateCustLoc(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id'],$data['cust_id'], $data['custloc_id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'customer_locations', 'U', array('co_id' => $company, 'cust_id' => $params-> cust_id, 'custloc_id' => $params-> custloc_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteCustLoc(stdClass $params)
    {
        $sql = "DELETE FROM customer_locations WHERE co_id='$params->co_id' and (cust_id = '$params->cust_id') and (custloc_id= '$params->custloc_id') ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
	
}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
