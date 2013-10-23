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

class Pinjaman_BB_BJ
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

    public function getPinjam(stdClass $params){
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT * FROM PINJAMAN_BB_BJ where co_id='$company' ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function getPinjamDetail(stdClass $params){
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.bb_nama, c.prod_nama FROM PINJAMAN_BB_BJ_DETAIL a
        left join bahanbaku b on a.bb_id=b.bb_id and a.co_id=b.co_id
        left join items c on a.prod_id=c.prod_id and a.co_id=c.co_id
        where a.co_id='$company' and a.dok_no='$params->dok_no'";
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
    public function addPinjam_I()
    {

        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $this->db->setSQL("execute procedure PINJAMAN_BB_BJ_I '$useredit','$userinput','I','$co_id'");
        $this->db->execOnly();
    }
    public function addPinjam_O()
    {

        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $this->db->setSQL("execute procedure PINJAMAN_BB_BJ_I '$useredit','$userinput','O','$co_id'");
        $this->db->execOnly();
    }
    public function addPinjamDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id'],$data['bb_nama'],$data['prod_nama'],$data['sequence_no']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'PINJAMAN_BB_BJ_Detail', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function updatePinjam(stdClass $params)
    {

        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $remaks = $params->remaks ;
        $cust_id = $params->cust_id;
        $vend_id = $params->vend_id;
        $gudang_id = $params->gudang_id;
        $bb_bj_type = 'B';//pinjaman abahan baku
        $status = $params->status;
        $dok_no = $params->dok_no;
        $dok_type = $params->dok_type;
        if($params->posted_date == '' or $params->posted_date == null){
            $posted_date = $this->db->Date_Converter(Time::getLocalTime('Y-m-d H:i:s'));
        }else{
            $posted_date = $this->db->Date_Converter($params -> posted_date);
        }
        $tgl_jt = $this->db->Date_Converter($params -> tgl_jt);
        $sql = ("execute procedure PINJAMAN_BB_BJ_U '$gudang_id','$cust_id','$posted_date','$status','$remaks','$vend_id'
        ,'$dok_no','$bb_bj_type','$useredit','$userinput','$dok_type','$co_id','$tgl_jt'");
        $this->db->setSQL($sql);
        $this->db->execOnly();

        return $params;

    }

    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deletePinjam(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->dok_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM pinjaman_bb_bj_detail WHERE dok_no = '$params->dok_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM pinjaman_bb_bj WHERE dok_no = '$params->dok_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }
    public function deletePinjamDetail(stdClass $params)
    {

        $sql = "DELETE FROM pinjaman_bb_bj_detail
        WHERE dok_no = '$params->dok_no' and sequence_no='$params->sequence_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }



}
