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

class Companies
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
    public function getCompanies(stdClass $params)
    {
/*
        if (isset($params -> aktif))
        {
            $wherex = "aktif = '" . $params -> aktif . "'";
        }
        else
        {
            $wherex = "aktif = '1'";
        }
*/
        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'co_nama';
        }
        $sql = "SELECT * FROM company ORDER BY $orderx";
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
    public function addCompany(stdClass $params)
    {

        $data = get_object_vars($params);
//		unset($data['co_id']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'company', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
//		$params -> co_id = $this -> db -> lastInsertId;
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateCompany(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['co_id'], $data['old_co_id'], $data['id']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'company', 'U', array('co_id' => $params -> old_co_id));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        $params->old_co_id = $params->co_id;
        return $params;
    }

    /**
     * Not in used. For Now you can only set the Company "inactive"
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteCompany(stdClass $params)
    {
        $data = get_object_vars($params);
        $data['aktif'] = '0';
        unset($data['co_id'], $data['old_co_id'], $data['id']);
        $sql = $this -> db -> sqlBind($data, 'company', 'U', array('co_id' => $params -> old_co_id));
//		$sql = "DELETE FROM company WHERE co_id = ". $params -> co_id;
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function deleteCompanybyID(stdClass $params)
    {
        $sql = "DELETE FROM company WHERE co_id = '$params->co_id'";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    public function getCompanyInfo($fid)
    {

        $this -> db -> setSQL("SELECT co_id, co_nama, alamat, npwp, kota, aktif
                        	 FROM company
                            WHERE co_id = '$fid'");
        $i = $this -> db -> fetchRecord(PDO::FETCH_ASSOC);
        $i = array_change_key_case($i);
        $CompanyInfo = 'Company: ' . $i['co_nama'] . ' ' . $i['alamat'] . ' ' . $i['kota'] . ' ' . $i['npwp'];

        return $CompanyInfo;
    }

}
