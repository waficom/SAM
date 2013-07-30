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

class Reclass
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

    public function getViewReclass(stdClass $params)
    {
        $sql = "select jurnal.coa as account, jurnal.inv_code as for_inv_code, jurnal.debit, jurnal.credit, jurnal.timeedit, coa.coa_nama from jurnal
        left join coa on jurnal.coa=coa.coa_id and jurnal.co_id=coa.co_id
        where jurnal.coa='$params->Account' and jurnal.reclass_status = 'N'
         ORDER BY jurnal.timeedit DESC";
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
    public function addViewReclass(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'],$data['check'],$data['coa_nama']);
        $sql = $this -> db -> sqlBind($data, 'ap_reclass', 'I');
        $this -> db -> setSQL($sql);
        //print_r($sql);
        $this -> db -> execLog();
        return $params;
    }


}
