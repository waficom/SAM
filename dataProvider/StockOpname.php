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
class StockOpname
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

	public function getStockOpname(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, c.bb_nama from stock_opname_bb a
        left join bahanbaku c on a.co_id=c.co_id and a.bb_id=c.bb_id
        where a.co_id='$company' ORDER BY a.timeedit DESC";
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
	public function addStockOpname(stdClass $params)
	{
        $data = get_object_vars($params);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        unset($data['id'], $data['bb_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['posted_date'] = $this->db->Date_Converter($params-> posted_date);
        $sql = $this->db->sqlBind($data, 'stock_opname_bb', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateStockOpname(stdClass $params)
	{
        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $tglposting = $this->db->Date_Converter($params-> posted_date);
        $sql = ("execute procedure stock_opname_bb_u
         '$params->keterangan','$params->dok_no','$params->status','$tglposting','$userinput',$params->total_selisih,$params->harga_selisih, $params->qty_selisih, $params->total_opname, $params->harga_opname, '$params->qty_opname',
        $params->total_akhir, $params->harga_akhir, $params->qty_akhir, '$params->sat_id', '$params->gudang_id',
        '$params->bb_id','$params->periode','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
	}

	public function deleteStockOpname(stdClass $params)
	{
        $co_id= $_SESSION['user']['site'];
        $sql = "DELETE FROM jurnal WHERE co_id ='$co_id' and inv_code='$params->dok_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
		$sql = "DELETE FROM STOCK_OPNAME_BB WHERE co_id ='$co_id' and bb_id='$params->bb_id' and gudang_id='$params->gudang_id' and sat_id='$params->sat_id' and periode='$params->periode' ";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}


    // stock barang jadi //

    public function getStockOpnameBJ(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, c.prod_nama from stock_opname_bj a
        left join items c on a.co_id=c.co_id and a.prod_id=c.prod_id
        where a.co_id='$company' ORDER BY a.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function addStockOpnameBJ(stdClass $params)
    {
        $data = get_object_vars($params);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        unset($data['id'], $data['prod_nama']);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['posted_date'] = $this->db->Date_Converter($params-> posted_date);
        $sql = $this->db->sqlBind($data, 'stock_opname_bj', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function updateStockOpnameBJ(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $tglposting = $this->db->Date_Converter($params-> posted_date);
        $sql = ("execute procedure stock_opname_bj_u
         '$params->keterangan','$params->dok_no','$params->status','$tglposting','$userinput',$params->total_selisih,$params->harga_selisih, $params->qty_selisih, $params->total_opname, $params->harga_opname, '$params->qty_opname',
        $params->total_akhir, $params->harga_akhir, $params->qty_akhir, '$params->sat_id', '$params->gudang_id',
        '$params->prod_id','$params->periode','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function deleteStockOpnameBJ(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $sql = "DELETE FROM jurnal WHERE co_id ='$co_id' and inv_code='$params->dok_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM STOCK_OPNAME_BJ WHERE co_id ='$co_id' and prod_id='$params->prod_id' and gudang_id='$params->gudang_id' and sat_id='$params->sat_id' and periode='$params->periode' ";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

	
}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
