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

    public function getPB0(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select A.* from pb0 A where a.co_id='$company' ORDER BY A.timeedit";
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
    public function addPB0(stdClass $params)
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
        $sql = $this->db->sqlBind($data, 'pb0', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
//		$params->id = $this->user_id = $this->db->lastInsertId;
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
        unset($data['id'], $data['pb_num']);
        $sql = $this->db->sqlBind($data, 'pb0', 'U', array('pb_num' => $params->pb_num));
        $this->db->setSQL($sql);
        // print_r($sql);
        $this->db->execLog();
        return $params;
    }

    public function deletePB0(stdClass $params)
    {
        $sql = "DELETE FROM pengadaan_barang WHERE (co_id = '$params->co_id') and (pb_num = '$params->pb_num')" ;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM pb0 WHERE (co_id = '$params->co_id') and (pb_num = '$params->pb_num')" ;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }

    public function getPB(stdClass $params)
    {
        $sql = "select A.*, B.bb_nama from
pengadaan_barang A
left join bahanbaku B on A.co_id=B.co_id and A.bb_id=B.bb_id
WHERE (A.co_id = '$params->co_id') and (A.pb_num = '$params->pb_num')
        ORDER BY A.timeedit";
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
        //print_r($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatePB(stdClass $params)
    {
        $data       = get_object_vars($params);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['tanggal'] = $this->db->Date_Converter($data['tanggal']);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['pb_num'], $data['bb_nama']);
        $sql = $this->db->sqlBind($data, 'pengadaan_barang', 'U', array('pb_num' => $params->pb_num));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deletePB(stdClass $params)
    {
        $sql = "DELETE FROM pengadaan_barang WHERE (co_id = '$params->co_id') and (pb_num = '$params->pb_num')" ;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}

//$u = new User();
//print_r($u->getUserByUsername('demo'));
