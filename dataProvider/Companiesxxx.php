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
//include_once ($_SESSION['root'] . '/classes/dbHelper.php');
require_once($_SESSION['root'] . '/classes/pdo_database.class.php');

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
        error_reporting(-1);
        if (isset($_SESSION['site']['db']))
        {

            $dbtype = (string)$_SESSION['site']['db']['type'];
            $host = (string)$_SESSION['site']['db']['host'];
            $port = (int)$_SESSION['site']['db']['port'];
            $dbName = (string)$_SESSION['site']['db']['database'];
            $dbUser = (string)$_SESSION['site']['db']['username'];
            $dbPass = (string)$_SESSION['site']['db']['password'];

            try
            {
                # object = new wArLeY_DBMS(shortcut_database_type, server, database_name, user, password, port);
                $db = new wArLeY_DBMS($dbtype, $host, $dbName, $dbUser, $dbPass, $port);
                ///3.- Connect to database.
                $conn = $db->Cnxn(); //This step is really neccesary for create connection to database, and getting the errors in methods.

                ///4.- Check if connection are succesful or return error.
                if($conn==false) die("Error: Cant connect to database.");

                ///5.- If connection fail you can print the error... Note: Every operation you execute can try print this line, for get the latest error ocurred.
                echo $db->getError(); //Show error description if exist, else is empty.

//				}
            }
            catch(PDOException $e)
            {
                $this->err = $e->getMessage();
            }
        }
		return;
	}

	/**
	 * @param stdClass $params
	 * @return array
	 */
	public function getCompanies(stdClass $params)
	{
        error_reporting(-1);
		if (isset($params -> aktif))
		{
			$wherex = "aktif = '" . $params -> aktif . "'";
		}
		else
		{
			$wherex = "aktif = '1'";
		}
		if (isset($params -> sort))
		{
			$orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
		}
		else
		{
			$orderx = 'co_nama';
		}
		$sql = "SELECT FIRST $params->limit * FROM company WHERE $wherex ORDER BY $orderx";
//		$this -> db -> setSQL($sql);
        print_r($sql);
		$rows = array();
        $rs = $this->db->query($sql);
//		foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
		foreach ($rs as $row)
		{
            $row = array_change_key_case($row);
			array_push($rows, $row);
		}
        error_reporting(0);
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
//		$sql = $this -> db -> sqlBind($data, 'company', 'I');
//		$this -> db -> setSQL($sql);
//		$this -> db -> execLog();
        $body = "CO_ID='" . trim($data['co_id']) . "'";
        $body .= ",CO_NAMA='". trim($data['co_nama']) ."'";
        $body .= ",NPWP='". trim($data['npwp']) ."'";
        $body .= ",ALAMAT='". trim($data['alamat']) ."'";
        $body .= ",KOTA='". trim($data['kota']) ."'";
        $body .= ",TELEPON1='". trim($data['telepon1']) ."'";
        $body .= ",TELEPON2='". trim($data['telepon2']) ."'";
        $body .= ",FAX='". trim($data['fax']) ."'";
        $body .= ",PROPINSI='". trim($data['propinsi']) ."'";
        $body .= ",KODEPOS='". trim($data['kodepos']) ."'";
        $body .= ",NEGARA='". trim($data['negara']) ."'";
        $body .= ",KETERANGAN='". trim($data['keterangan']) ."'";
        $body .= ",AES='". trim($data['aes']) ."'";
        $body .= ",AKTIF='". trim($data['aktif']) ."'";

        $this -> db -> insert("company", $body);
        $params->old_co_id = $params->co_id;
		return $params;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateCompany(stdClass $params)
	{
        error_reporting(-1);
		$data = get_object_vars($params);
		unset($data['id']);
        $params->old_co_id = trim($params->old_co_id);
        $body = "CO_ID='" . trim($data['co_id']) . "'";
        $body .= ",CO_NAMA='". trim($data['co_nama']) ."'";
        $body .= ",NPWP='". trim($data['npwp']) ."'";
        $body .= ",ALAMAT='". trim($data['alamat']) ."'";
        $body .= ",KOTA='". trim($data['kota']) ."'";
        $body .= ",TELEPON1='". trim($data['telepon1']) ."'";
        $body .= ",TELEPON2='". trim($data['telepon2']) ."'";
        $body .= ",FAX='". trim($data['fax']) ."'";
        $body .= ",PROPINSI='". trim($data['propinsi']) ."'";
        $body .= ",KODEPOS='". trim($data['kodepos']) ."'";
        $body .= ",NEGARA='". trim($data['negara']) ."'";
        $body .= ",KETERANGAN='". trim($data['keterangan']) ."'";
        $body .= ",AES='". trim($data['aes']) ."'";
        $body .= ",AKTIF='". trim($data['aktif']) ."'";
        $condition = "CO_ID = '" . trim($data['old_co_id']) . "'";
        $this -> db ->update("company",$body,$condition);
        $params->old_co_id = $data->co_id;
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
		unset($data['id']);
		$sql = $this -> db -> sqlBind($data, 'company', 'U', array('co_id' => $params -> co_id));
//		$sql = "DELETE FROM company WHERE co_id = ". $params -> co_id;
        $this-> db -> AddToLog($sql);
		$this -> db -> setSQL($sql);
		$this -> db -> execLog();
		return $params;
	}

	public function deleteCompanybyID($id)
	{
		$sql = "DELETE FROM company WHERE co_id = '". $id . "'"; 
		$this -> db -> query($sql);
		return $id;
	}

	public function getCompanyInfo($fid)
	{

        $sql = "SELECT co_id, co_nama, alamat, npwp, kota, aktif
                        	 FROM company
                            WHERE co_id = '$fid'";
		$i = $this -> db -> query($sql);
        $i = array_change_key_case($i);
		$CompanyInfo = 'Company: ' . $i['co_nama'] . ' ' . $i['alamat'] . ' ' . $i['kota'] . ' ' . $i['npwp'];

		return $CompanyInfo;
	}

}
