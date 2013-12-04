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

class Cashbon_Kurang
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

    public function getCashbon_Kurang(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "select A.*, B.description as bank_nama, C.description as tax_nama, D.coa_nama as account_nama, E.posted_date as posted_date_cb_cashbon
        from cashbon A
        left join bank_m B on A.bank_code=B.bank_code and A.co_id=B.co_id
        left join tax_m C on A.tax_code=C.tax_code and A.co_id=C.co_id
        left join coa D on A.account=D.coa_id and A.co_id=D.co_id
        left join cashbook_in E on A.inv_cb=E.inv_code and A.co_id=E.co_id
        where a.co_id='$company'
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

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addCashbon_Kurang(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        if($params->status=='true'){
            $data['status'] = '1';
        }else{
            $data['status'] = '0';
        }
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'],$data['bank_nama'],$data['tax_nama'],$data['account_nama']);
        $sql = $this -> db -> sqlBind($data, 'cashbon', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateCashbon_Kurang(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        if($params->status=='true'){
            $data['status'] = '1';
        }else{
            $data['status'] = '0';
        }
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'],$data['inv_code'],$data['bank_nama'],$data['tax_nama'],$data['account_nama'] ,$data['posted_date_cb_cashbon']);
        $sql = $this -> db -> sqlBind($data, 'cashbon', 'U', array('co_id' => $params -> co_id, 'inv_code' => $params -> inv_code));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteCashbon_Kurang(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE co_id = '$params->co_id' and inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        $sql = "DELETE FROM cashbon WHERE co_id = '$params->co_id' and inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }



}