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
class BahanBaku
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



	public function getbb(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM bahanbaku where co_id='$company' ORDER BY bb_id";
		$this -> db -> setSQL($sql);
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
	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function addbb(stdClass $params)
	{
		$data = get_object_vars($params);
		foreach($data as $key => $val){
			if($val == null || $val == ''){
				unset($data[$key]);
			}
		}
		$data['co_id'] = $_SESSION['user']['site'];		
		$sql = $this->db->sqlBind($data, 'bahanbaku', 'I');
		$this->db->setSQL($sql);
		$this->db->execLog();
        return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updatebb(stdClass $params)
	{
		$data       = get_object_vars($params);
        $company =  $_SESSION['user']['site'];
        unset($data['id'], $data['old_bb_id'], $data['bb_id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
		$sql = $this->db->sqlBind($data, 'bahanbaku', 'U', array('bb_id' => $params->old_bb_id,'co_id' => $company ));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deletebb(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
		$sql = "DELETE FROM bahanbaku WHERE co_id = '$company' and (bb_id = '$params->bb_id')" ;
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
	
}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
