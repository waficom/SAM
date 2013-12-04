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
class Vendor
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


	public function getvendor(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
		$sql = "SELECT A.*, case vend_type when 'S' then 'Suplier' else 'Transporter' end as vend_type_desc
		 FROM vendor A where a.co_id='$company' ORDER BY A.vend_id";
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
	public function addvendor(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['id'], $data['old_vend_id']);
		foreach($data as $key => $val){
			if($val == null || $val == ''){
				unset($data[$key]);
			}
		}
		$data['co_id'] = $_SESSION['user']['site'];		
		$sql = $this->db->sqlBind($data, 'vendor', 'I');
		$this->db->setSQL($sql);
		$this->db->execLog();
//		$params->id = $this->id = $this->db->lastInsertId;
        return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updatevendor(stdClass $params)
	{
		$data = get_object_vars($params);
		unset($data['id'], $data['vend_id'], $data['old_vend_id'], $data['vend_type_desc']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
		$sql = $this->db->sqlBind($data, 'vendor', 'U', array('co_id' => $params->co_id, 'vend_id' => $params->vend_id));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deletevendor(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
		$sql = "DELETE FROM vendor WHERE (co_id = '$company') and (vend_id = '$params->vend_id')";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
	
}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
