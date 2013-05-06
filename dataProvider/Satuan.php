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
class Satuan
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

    public function getSatuanLiveSearch(stdClass $params)
	{
		$this->db->setSQL("SELECT co_id,
		                          satuan_id, 
		                          satuan_nama
							FROM satuan
   							WHERE UPPER(satuan_id) LIKE UPPER('%$params->query%')
   							   OR UPPER(satuan_nama) LIKE UPPER('%$params->query%')");
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

	public function getsatuan(stdClass $params)
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
			$orderx = 'satuan_nama';
		}
		$sql = "SELECT * FROM satuan ORDER BY $orderx";
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
	public function addsatuan(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['id'],$data['old_satuan_id']);
		foreach($data as $key => $val){
			if($val == null || $val == ''){
				unset($data[$key]);
			}
		}
		$data['co_id'] = $_SESSION['user']['site'];		
		$sql = $this->db->sqlBind($data, 'satuan', 'I');
		$this->db->setSQL($sql);
		$this->db->execLog();
//		$params->id = $this->user_id = $this->db->lastInsertId;
        return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updatesatuan(stdClass $params)
	{
		$data       = get_object_vars($params);
		unset($data['id'], $data['satuan_id'], $data['old_satuan_id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
		$sql = $this->db->sqlBind($data, 'satuan', 'U', array('satuan_id' => $params->old_satuan_id));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deletesatuan(stdClass $params)
	{
		$sql = "DELETE FROM satuan WHERE (co_id = '$params->co_id') and (satuan_id = '$params -> satuan_id')";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
	
}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
