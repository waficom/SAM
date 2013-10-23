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

class AR_Sale_Payment
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

    public function getAR_Sale_Payment(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "select A.*, B.cust_nama, C.description as bank_nama, D.posted_date as posted_date_ar, D.piutangdebtor
        from ar_sale_payment A
        left join customer B on A.cust_id=B.cust_id and A.co_id=B.co_id
        left join bank_m C on A.bank_code=C.bank_code and A.co_id=C.co_id
        left join ar_sale D on A.for_inv_code=D.inv_code and A.co_id=D.co_id
         where a.co_id='$company' and A.inv_type <>'A' ORDER BY $orderx DESC";
        $this -> db -> setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }

        return $rows;

    }
    public function getAR_Payment_Alocation(stdClass $params)
    {
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $company =  $_SESSION['user']['site'];
        $sql = "select A.*, B.piutangdebtor, C.nilaidasar as uangmuka,
          B.posted_date as ar_inv_date, C.posted_date as ar_date_um
        from ar_sale_payment A
         left join ar_sale B on A.for_inv_code=B.inv_code and A.co_id=B.co_id
         left join ar_sale_payment C on A.inv_um=C.inv_code and A.co_id=C.co_id
        where a.co_id='$company' and A.inv_type ='A' ORDER BY $orderx DESC";
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
    public function addAR_Sale_Payment(stdClass $params)
    {

        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        unset($data['id'],$data['inv_code'], $data['bank_nama'], $data['cust_nama']
        , $data['posted_date_ar'], $data['piutangdebtor'],$data['ar_inv_date'],$data['ar_date_um'],$data['uangmuka']);
        $sql = $this -> db -> sqlBind($data, 'ar_sale_payment', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }


    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateAR_Sale_Payment(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['inv_date'] = $this->db->Date_Converter($data['inv_date']);
        $data['posted_date'] = $this->db->Date_Converter($data['posted_date']);
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['inv_code'], $data['bank_nama'], $data['cust_nama']
        , $data['posted_date_ar'], $data['piutangdebtor'],$data['ar_inv_date'],$data['ar_date_um'],$data['uangmuka']);
        $sql = $this -> db -> sqlBind($data, 'ar_sale_payment', 'U', array('inv_code' => $params -> inv_code));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteAR_Sale_Payment(stdClass $params)
    {
        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        $sql = "DELETE FROM ar_sale_payment WHERE inv_code = '$params->inv_code'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }



}
