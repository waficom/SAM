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
class PengadaanBarang
{

    private $db;
    /**
     * @var
     */

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }

    public function getPB0(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select A.*, c.description as factory from pb0 A
        left join gudang b on a.co_id=b.co_id and a.gudang_id=b.gudang_id
        left join pabrik_location c on b.pabrik_sequence=c.pabrik_sequence and b.co_id=c.co_id
        where a.co_id='$company' ORDER BY A.timeedit";
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
    public function addPB0(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['factory']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'pb0', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatePB0(stdClass $params)
    {
        $data       = get_object_vars($params);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['pb_num'], $data['factory']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'pb0', 'U', array('co_id' => $params->co_id, 'pb_num' => $params->pb_num));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deletePB0(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM pengadaan_barang WHERE (co_id = '$company') and (pb_num = '$params->pb_num')" ;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM pb0 WHERE (co_id = '$company') and (pb_num = '$params->pb_num')" ;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getPB(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select A.*, B.bb_nama, c.status
        from pengadaan_barang A
        left join bahanbaku B on A.co_id=B.co_id and A.bb_id=B.bb_id
        left join pb0 c on a.co_id=c.co_id and a.pb_num=c.pb_num
        WHERE A.co_id = '$company' and A.pb_num = '$params->pb_num'
        ORDER BY A.bb_id ASC";
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
    public function addPB(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'pengadaan_barang', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatePB(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $data= get_object_vars($params);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['pb_num'], $data['bb_nama'], $data['status']);
        $sql = $this->db->sqlBind($data, 'pengadaan_barang', 'U', array('co_id' => $company,'pb_num' => $params->pb_num, 'bb_id' => $params->bb_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deletePB(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM pengadaan_barang WHERE co_id = '$company' and pb_num = '$params->pb_num' and bb_id = '$params->bb_id'" ;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
