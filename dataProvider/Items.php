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
class Items
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

    public function getItemsLiveSearch(stdClass $params)
	{
		$this->db->setSQL("SELECT co_id,
		                          prod_id, 
		                          prod_nama
							FROM items
   							WHERE UPPER(prod_id)   LIKE UPPER('%$params->query%')
   							   OR UPPER(prod_nama) LIKE UPPER('%$params->query%') ");
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
	
	public function getitems(stdClass $params)
	{

//		$sql = "SELECT * FROM items WHERE $wherex ORDER BY $orderx LIMIT $params->start,$params->limit";
		$sql = "SELECT i.*, j.jenis_nama, k.kemasan_nama, s.satuan_nama, sp.spesifikasi_nama, b.bentuk_nama 
		        FROM items i
		        LEFT JOIN jenis  j ON j.jenis_id = i.jenis_id and j.co_id = i.co_id
		        LEFT JOIN kemasan  k ON k.kemasan_id = i.kemasan_id and k.co_id = i.co_id
		        LEFT JOIN satuan s ON s.satuan_id = i.satuan_id and s.co_id = i.co_id
		        LEFT JOIN spesifikasi sp ON sp.spesifikasi_id = i.spesifikasi_id and sp.co_id = i.co_id
		        LEFT JOIN bentuk b ON b.bentuk_id = i.bentuk_id and b.co_id = i.co_id";
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
	public function additems(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['id'], $data['old_prod_id']);
		foreach($data as $key => $val){
			if($val == null || $val == ''){
				unset($data[$key]);
			}
		}
		$data['co_id'] = $_SESSION['user']['site'];		

		$sql = $this->db->sqlBind($data, 'items', 'I');
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateitems(stdClass $params)
	{
		$data       = get_object_vars($params);
		unset($data['id'], $data['prod_id'], $data['old_prod_id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
		$sql = $this->db->sqlBind($data, 'items', 'U', array('prod_id' => $params->old_prod_id));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deleteitems(stdClass $params)
	{
        $sql = "DELETE FROM price WHERE (co_id = '$params->co_id') and (prod_id = '$params->prod_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
		$sql = "DELETE FROM items WHERE (co_id = '$params->co_id') and (prod_id = '$params->prod_id')";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
	
	public function getprice(stdClass $params)
	{
		$this->db->setSQL("SELECT p.*
                         FROM price p
                    LEFT JOIN items i ON i.prod_id = p.prod_id and i.co_id = p.co_id
                    WHERE p.prod_id = '$params->prod_id'");

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
	public function addprice(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['id'], $data['old_prod_id'],$data['sequence_no']);

		foreach($data as $key => $val){
			if($val == null || $val == ''){
				unset($data[$key]);
			}
		}
		$data['co_id'] = $_SESSION['user']['site'];
        $data['tgl_efektif'] = $this->db->Date_Converter($data['tgl_efektif']);
        if (is_null($data['ppn']) || ($data['ppn'] == '')) {
            $data['ppn'] = '0';
        }
        if (is_null($data['promosi']) || ($data['promosi'] == '')) {
            $data['promosi'] = '0';
        }
        if (is_null($data['puslit']) || ($data['puslit'] == '')) {
            $data['puslit'] = '0';
        }
        if (is_null($data['insentif']) || ($data['insentif'] == '')) {
            $data['insentif'] = '0';
        }

        $sql = $this->db->sqlBind($data, 'price', 'I');
		$this->db->setSQL($sql);
      // print_r($sql);
		$this->db->execLog();
		return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateprice(stdClass $params)
	{
		$data       = get_object_vars($params);
		unset($data['id'], $data['prod_id'], $data['sequence_no'],$data['prod_nama'],$data['old_prod_id'],$data['puslit'],$data['insentif']);
        $data['tgl_efektif'] = $this->db->Date_Converter($data['tgl_efektif']);
		$sql = $this->db->sqlBind($data, 'price', 'U', array('prod_id' => $params->prod_id, 'sequence_no' => $params->sequence_no));
		$this->db->setSQL($sql);
        //print_r($sql);
		$this->db->execLog();
		return $params;
	}

	public function deleteprice(stdClass $params)
	{
        //$tgl = $this->db->Date_Converter($params['tgl_efektif']);
       // error_reporting(-1);
        $sql = "DELETE FROM price WHERE (co_id = '$params->co_id') and (prod_id = '$params->prod_id')
		        and (sequence_no = 'sequence_no')";
		$this -> db -> setSQL($sql);
        //print_r($sql);
		$this -> db -> execLog();
		return $params;
	}
}
