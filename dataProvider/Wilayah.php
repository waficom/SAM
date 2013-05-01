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

class Wilayah
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

    public function getWilayahLiveSearch(stdClass $params)
    {
        $this->db->setSQL("SELECT co_id,
		                          wilayah_id,
		                          wilayah_nama
							FROM wilayah
   							WHERE wilayah_id          LIKE '$params->query%'
   							  OR wilayah_nama         LIKE '$params->query%'");
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

    public function getwilayah(stdClass $params)
    {
        $sql = "SELECT * FROM wilayah";
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
    public function addwilayah(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['old_wilayah_id']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }

        $data['co_id'] = $_SESSION['user']['site'];
        $sql = $this -> db -> sqlBind($data, 'wilayah', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatewilayah(stdClass $params)
    {
        $data       = get_object_vars($params);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        if ($data['old_wilayah_id'] == $data['wilayah_id']) {
            unset($data['id'], $data['wilayah_id'], $data['old_wilayah_id']);
            $sql = $this->db->sqlBind($data, 'wilayah', 'U', array('wilayah_id' => $params->old_wilayah_id));
        }
        else
        {
            $sql = "UPDATE saleswil SET wilayah_id = '" . $data['wilayah_id'] . "' WHERE wilayah_id = '". $data['old_wilayah_id'] . "'";
            $this->db->setSQL($sql);
            $this->db->execLog();
            unset($data['id'], $data['wilayah_id'], $data['old_wilayah_id']);
            $sql = $this->db->sqlBind($data, 'wilayah', 'U', array('wilayah_id' => $params->old_wilayah_id));
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deletewilayah(stdClass $params)
    {
        $sql = "DELETE FROM saleswil WHERE (co_id = '$params->co_id') and (wilayah_id = '$params->wilayah_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $sql = "DELETE FROM wilayah WHERE (co_id = '$params->co_id') and (wilayah_id = '$params->wilayah_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getsaleswil(stdClass $params)
    {
        $this->db->setSQL("SELECT sw.*, s.sales_nama
                         FROM saleswil sw
                    LEFT JOIN salesman s ON sw.sales_id = s.sales_id and sw.co_id = s.co_id
                    WHERE sw.wilayah_id = '" . $params->wilayah_id ."'");

        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;
    }

    public function addsaleswil(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['old_sales_id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['sales_id'] = $params->sales_id;
        $sql = $this->db->sqlBind($data, 'saleswil', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatesaleswil(stdClass $params)
    {
        $data       = get_object_vars($params);
        unset($data['id'], $data['sales_id'], $data['old_sales_id'], $data['sales_nama']);
        unset($data['co_id'], $data['wilayah_id']);
        $cond = array('sales_id' => trim($params->old_sales_id), 'co_id' => $params->co_id, 'wilayah_id' => $params->wilayah_id);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this->db->sqlBind($data, 'saleswil', 'U', $cond);
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deletesaleswil(stdClass $params)
    {
        $sql = "DELETE FROM saleswil WHERE (co_id = '$params->co_id') and (wilayah_id = '$params->wilayah_id')
                and (sales_id = '$params->sales_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}
