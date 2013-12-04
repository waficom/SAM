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
class ReleaseOrder
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

    public function getReleaseOrder(stdClass $params)
    {

        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.cust_nama FROM so0 a
         left join customer b on a.co_id=b.co_id and a.cust_id=b.cust_id
         where a.co_id='$company' and a.status=0 ORDER BY so_num ASC";
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

    public function updateReleaseOrder(stdClass $params)
    {
        $data = get_object_vars($params);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        unset($data['id'], $data['cust_nama'],$data['tanggal']);
        $data['released_date'] = $this->db->Date_Converter($data['released_date']);
        $data['status'] = 1;
        $sql = $this -> db -> sqlBind($data, 'so0', 'U', array('so_num' => $params -> so_num,'co_id' => $params -> co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getReleaseOrderCancel(stdClass $params)
    {

        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.cust_nama FROM so0 a
         left join customer b on a.co_id=b.co_id and a.cust_id=b.cust_id
         where a.co_id='SAM' and a.status=1 and
         not exists (select * from pp_detailproduksi aa
            inner join pp_produksi bb on aa.co_id=bb.co_id and aa.no_pp=bb.no_pp
            where aa.so_num=a.so_num)
         ORDER BY so_num ASC";
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

    public function updateReleaseOrderCancel(stdClass $params)
    {
        $data = get_object_vars($params);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        unset($data['id'], $data['cust_nama'],$data['tanggal']);
        $data['cancel_date'] = $this->db->Date_Converter($data['cancel_date']);
        if($params->canceled=1){
            $data['status'] = 2;
        }
        $sql = $this -> db -> sqlBind($data, 'so0', 'U', array('so_num' => $params -> so_num,'co_id' => $params -> co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    public function getRCL(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "SELECT a.*, b.description
        FROM risk_cheklist a
         left join risk_m b on a.co_id=b.co_id and a.risk_code=b.risk_code
         where a.co_id='$company' and so_num='$params->so_num' ORDER BY so_num ASC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function updateRCL(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['description']);
        $sql = $this -> db -> sqlBind($data, 'risk_cheklist', 'U', array('so_num' => $params -> so_num,'co_id' => $params -> co_id, 'risk_code' => $params -> risk_code));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     *
     * @param stdClass $params
     * @return stdClass
     */

}
