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

class Pengembalian_BB_BJ
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

    public function getPengembalian(stdClass $params){
        $sql = "SELECT a.* FROM PENGEMBALIAN_BB_BJ a
where a.model_type='I'
         ORDER BY a.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function getPengembalian_O(stdClass $params){
        $sql = "SELECT a.* FROM PENGEMBALIAN_BB_BJ a
         where a.model_type='O'
         ORDER BY a.timeedit DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function getPengembalianDetail(stdClass $params){
        $sql = "SELECT a.*, b.bb_nama, c.prod_nama FROM PENGEMBALIAN_BB_BJ_DETAIL a
        left join bahanbaku b on a.bb_id=b.bb_id and a.co_id=b.co_id
        left join items c on a.prod_id=c.prod_id and a.co_id=c.co_id
        where a.dok_no='$params->dok_no'";
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
    public function addPengembalian_I()
    {
        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $sql = ("execute procedure PENGEMBALIAN_BB_BJ_I 'I','$useredit','$userinput','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }
    public function addPengembalian_O()
    {

        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $sql = ("execute procedure PENGEMBALIAN_BB_BJ_I 'O','$useredit','$userinput','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }
    public function addPengembalianDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        unset($data['id'],$data['bb_nama'],$data['prod_nama'],$data['sequence_no']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'PENGEMBALIAN_BB_BJ_Detail', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


        public function updatePengembalian(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['dok_no']);
        $sql = $this -> db -> sqlBind($data, 'pengembalian_bb_bj', 'U', array('dok_no' => $params-> dok_no));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function updatePengembalianDetail(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['dok_no']);
        $sql = $this -> db -> sqlBind($data, 'pengembalian_bb_bj_detail', 'U', array('dok_no' => $params-> dok_no, 'bb_id' => $params-> bb_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deletePengembalian(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->dok_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM PENGEMBALIAN_BB_BJ_detail WHERE dok_no = '$params->dok_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM PENGEMBALIAN_BB_BJ WHERE dok_no = '$params->dok_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }
    public function deletePengembalianDetail(stdClass $params)
    {

        $sql = "DELETE FROM PENGEMBALIAN_BB_BJ_detail WHERE dok_no = '$params->dok_no' and sequence_no='$params->sequence_no'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }



}
