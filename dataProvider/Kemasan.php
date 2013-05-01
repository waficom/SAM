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
class Kemasan
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

    public function getKemasanLiveSearch(stdClass $params)
	{
		$this->db->setSQL("SELECT co_id,
		                          kemasan_id,
		                          kemasan_nama
							FROM kemasan
   							WHERE kemasan_id          LIKE'$params->query%'
   							  OR kemasan_nama         LIKE'$params->query%'");
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

	public function getkemasan(stdClass $params)
	{
/*
		if (isset($params -> aktif))
		{
			$wherex = "aktif = " . $params -> aktif;
		}
		else
		{
			$wherex = "aktif = 1";
		}
*/
		if (isset($params -> sort))
		{
			$orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
		}
		else
		{
			$orderx = 'kemasan_nama';
		}
		$sql = "SELECT * FROM kemasan ORDER BY $orderx";
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
	public function addkemasan(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['id'], $data['old_kemasan_id']);
		foreach($data as $key => $val){
			if($val == null || $val == ''){
				unset($data[$key]);
			}
		}
		$data['co_id'] = $_SESSION['user']['site'];		
		$sql = $this->db->sqlBind($data, 'kemasan', 'I');
		$this->db->setSQL($sql);
		$this->db->execLog();
//		$params->id = $this->db->lastInsertId;
        return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updatekemasan(stdClass $params)
	{
		$data       = get_object_vars($params);
		unset($data['id'], $data['kemasan_id'], $data['old_kemasan_id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
		$sql = $this->db->sqlBind($data, 'kemasan', 'U', array('kemasan_id' => $params->old_kemasan_id));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deletekemasan(stdClass $params)
	{
		$sql = "DELETE FROM kemasan WHERE (co_id = '$params->co_id') and (kemasan_id = '$params->kemasan_id')";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
	
}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
