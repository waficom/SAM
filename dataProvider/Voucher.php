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

class Voucher
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

    public function getVoucher(stdClass $params)
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
        $sql = "select * from gl where co_id='$company' ORDER BY $orderx DESC";
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
    public function addVoucher()
    {
        $co_id= $_SESSION['user']['site'];
        $userinput=$_SESSION['user']['name'];
        $useredit=$_SESSION['user']['name'];
        $this->db->setSQL("execute procedure GL_VOUCHER_I '$useredit','$userinput','$co_id'");
		$this->db->execOnly();
    }


    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateVoucher(stdClass $params)
    {

        $co_id= $_SESSION['user']['site'];
        $useredit=$_SESSION['user']['name'];
        $this->db->setSQL("execute procedure GL_VOUCHER_U '$useredit','$params->inv_code','$co_id'");
        $this->db->execOnly();
    }

    public function deleteVoucher(stdClass $params)
    {
        $company =  $_SESSION['user']['site'];
        $sql = "DELETE FROM jurnal WHERE inv_code = '$params->inv_code' and co_id='$company'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        $sql = "DELETE FROM gl WHERE inv_code = '$params->inv_code' and co_id='$company'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();

        return $params;
    }



}
