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
class GrnDal
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

    public function getGrnDal(stdClass $params)
	{
        $company =  $_SESSION['user']['site'];
        $sql = "select * from gr0
        where co_id='$company' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
	}
	public function addGrnDal(stdClass $params)
	{
        if($params->status=='true'){
            $params->status = '1';
        }else{
            $params->status = '0';
        }
        $params->userinput = $_SESSION['user']['name'];
        $params->co_id= $_SESSION['user']['site'];
        $sql=("execute procedure grn_dal_i '$params->userinput','$params->grn_return','$params->status','$params->keterangan',
        '$params->gudang_id', '$params->rc_type', '$params->vend_id_trans', '$params->vend_id', '$params->gr_type', '$params->po_num',
        '$params->co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateGrnDal(stdClass $params)
	{
        if($params->status=='true'){
            $params->status = '1';
        }else{
            $params->status = '0';
        }
        $params->userinput = $_SESSION['user']['name'];
        $params->co_id= $_SESSION['user']['site'];
        $params->posted_date = $this->db->Date_Converter( $params->posted_date);
        $sql=("execute procedure grn_dal_u '$params->posted_date','$params->gr_num','$params->userinput','$params->grn_return','$params->status','$params->keterangan',
        '$params->gudang_id', '$params->rc_type', '$params->vend_id_trans', '$params->vend_id', '$params->gr_type', '$params->po_num',
        '$params->co_id'
        ");
        $this->db->setSQL($sql);
        $this->db->execOnly();
	}

	public function deleteGrnDal(stdClass $params)
	{
        $sql = "DELETE FROM jurnal WHERE (co_id = '$params->co_id') and (inv_code = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
        $sql = "DELETE FROM gr11 WHERE (co_id = '$params->co_id') and (gr_num = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
        $sql = "DELETE FROM gr10 WHERE (co_id = '$params->co_id') and (gr_num = '$params->gr_num')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
        $sql = "DELETE FROM gr0 WHERE (co_id = '$params->co_id') and (gr_num = '$params->gr_num')";
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();

		return $params;
	}

    public function getGrnDalDetail(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select a.*, b.bb_nama, d.qty as qty_po, d.hrg as hrg_po, d.qty*d.hrg as total_po, c.status
        from gr10 a
        left join bahanbaku b on a.co_id=b.co_id and a.bb_id=b.bb_id
        left join gr0 c on a.co_id=c.co_id and a.gr_num=c.gr_num
        left join po1 d on c.co_id=d.co_id and c.po_num=d.po_num and d.bb_id=a.bb_id and a.sat_id=d.sat_id
        where a.co_id='$company' and a.gr_num='$params->gr_num' ORDER BY a.bb_id ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }
    public function updateGrnDalDetail(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['qty_brutto'] = $params->qty_po;
        unset($data['id'],$data['bb_nama'],$data['qty_po'],$data['hrg_po'],$data['total_po'],$data['status']);
        $sql = $this -> db -> sqlBind($data, 'gr10', 'U', array('gr_num' => $params->gr_num, 'co_id' => $params->co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
	
}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
