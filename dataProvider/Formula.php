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

class Formula
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

    public function getFormulaLiveSearch(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
		$this->db->setSQL("SELECT co_id,
		                          formula_id, 
		                          formula_nama
							FROM formula0
   							WHERE co_id='$company' and UPPER(formula_id)     LIKE UPPER('%$params->query%')
   	    					   OR UPPER(formula_nama)   LIKE UPPER('%$params->query%') ");
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
	
	public function getformula(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
		$sql = "SELECT f0.*, sp.spesifikasi_nama, c.cust_nama
		             FROM formula0 f0
		             LEFT JOIN customer c ON c.cust_id = f0.cust_id and c.co_id = f0.co_id
		             LEFT JOIN spesifikasi sp ON sp.spesifikasi_id = f0.spesifikasi_id and sp.co_id = f0.co_id
                     where f0.co_id='$company'
                     ORDER BY f0.formula_nama";
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
	public function addformula(stdClass $params)
	{
		$data = get_object_vars($params);
		unset($data['id'], $data['old_formula_id']);
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
		foreach ($data AS $key => $val)
		{
			if ($val == '')
				unset($data[$key]);
		}
		$data['co_id'] = $_SESSION['user']['site'];
		$sql = $this -> db -> sqlBind($data, 'formula0', 'I');
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateformula(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
        $data       = get_object_vars($params);
        unset($data['id'], $data['formula_id'], $data['old_formula_id'], $data['cust_nama'],$data['spesifikasi_nama']);
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this->db->sqlBind($data, 'formula0', 'U', array('formula_id' => $params->formula_id, 'co_id' => $company));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deleteformula(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
		$sql = "DELETE FROM formula1 WHERE formula_id = '$params->formula_id' and co_id='$company'";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		$sql = "DELETE FROM formula0 WHERE formula_id = '$params->formula_id' and co_id='$company'";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
	
	public function getformula1(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
        $this->db->setSQL("SELECT *
                         FROM formula1 f1
                    LEFT JOIN satuan s ON f1.satuan_id = s.satuan_id and f1.co_id = s.co_id
                    LEFT JOIN bahanbaku b ON f1.bb_id = b.bb_id and f1.co_id = b.co_id
                    WHERE f1.co_id='$company' and f1.formula_id = '" . $params->formula_id ."'");

		$rows = array();
		foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
		{
            $row = array_change_key_case($row);
			array_push($rows, $row);
		}

		return $rows;
	}

	public function addformula1(stdClass $params)
	{
		$data = get_object_vars($params);
        unset($data['id'], $data['old_bb_id'],$data['sequence_no']);
		foreach($data as $key => $val){
			if($val == null || $val == ''){
				unset($data[$key]);
			}
		}
		$data['co_id'] = $_SESSION['user']['site'];
		$data['formula_id'] = $params->formula_id;		
		$sql = $this->db->sqlBind($data, 'formula1', 'I');
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}
	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateformula1(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
        $data       = get_object_vars($params);
		unset($data['id'], $data['bb_id'], $data['old_bb_id'], $data['bb_nama'], $data['satuan_nama'],$data['sequence_no']);
		$sql = $this->db->sqlBind($data, 'formula1', 'U', array('co_id' => $company,'formula_id' => $params->formula_id, 'sequence_no' => $params->sequence_no));
		$this->db->setSQL($sql);
		$this->db->execLog();
		return $params;
	}

	public function deleteformula1(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
		$sql = "DELETE FROM formula1 WHERE (co_id = '$company') and (formula_id = '$params->formula_id') and (sequence_no = '$params->sequence_no')";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}
	
		
}

//$f = new Formula();
//echo '<pre>';
//print_r($f->getformula($params));
//echo '</pre>';
