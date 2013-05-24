<?php
  /*
 GaiaEHR (Electronic Health Records)
 Facilities.php
 Facilities dataProvider
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
if (!isset($_SESSION))
{
	session_name('GaiaEHR');
	session_start();
	session_cache_limiter('private');
}
$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');
class Bentuk
{
	/**
	 * @var dbHelper
	 */
	private $db;
	/**
	 * Creates the dbHelper instance
	 */
	function __construct()
	{
		$this -> db = new dbHelper();
		return;
	}

	/**
	 * @param stdClass $params
	 * @return array
	 */

    public function getBentukLiveSearch(stdClass $params)
	{
		$this->db->setSQL("SELECT co_id,
		                          bentuk_id, 
		                          bentuk_nama
							FROM bentuk
   							WHERE UPPER(bentuk_id)  LIKE UPPER('%$params->query%')
   							  OR UPPER(bentuk_nama) LIKE UPPER('%$params->query%')");
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

	public function getBentuk(stdClass $params)
	{

		if (isset($params -> sort))
		{
			$orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
		}
		else
		{
			$orderx = 'bentuk_nama';
		}
		$sql = "SELECT * FROM bentuk ORDER BY $orderx";
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
	public function addBentuk(stdClass $params)
	{

		$data = get_object_vars($params);
		foreach ($data AS $key => $val)
		{
			if ($val == '')
				unset($data[$key]);
		}
		$data['co_id'] = $_SESSION['user']['site'];
		$sql = $this -> db -> sqlBind($data, 'bentuk', 'I');
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateBentuk(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['id'], $data['bentuk_id'], $data['old_bentuk_id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
		$sql = $this -> db -> sqlBind($data, 'bentuk', 'U', array('bentuk_id' => $params -> bentuk_id));
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}

	/**
	 *
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function deleteBentuk(stdClass $params)
	{
//		$sql = $this -> db -> sqlBind($data, 'bentuk', 'U', array('bentuk_id' => $params -> bentuk_id));
        $sql = "DELETE FROM bentuk WHERE (co_id = '$params->co_id') and (bentuk_id = '$params->bentuk_id')";
		$this -> db -> setSQL($sql);
       // print_r($sql);
		$this -> db -> execLog();
		return $params;
	}
}
