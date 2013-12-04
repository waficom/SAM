<?php
/*
 GaiaEHR (Electronic Health Records)
 ComboData.php
 ComboData dataProvider
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
include_once ($_SESSION['root'] . '/dataProvider/i18nRouter.php');
class CombosData
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
		$this->db = new dbHelper();
		return;
	}

	public function getTimeZoneList()
	{
		$locations = array();
		$zones     = timezone_identifiers_list();
		foreach($zones as $zone){
			$locations[] = array(
				'value' => $zone, 'name' => str_replace('_', ' ', $zone)
			);
		}
		return $locations;
	}

	public function getUsers()
	{
		$sql = "SELECT id, fname, lname
                  FROM users
                 WHERE usrname != '' AND aktif = 1 AND ( info IS NULL OR info NOT LIKE '%Inactive%' )
              ORDER BY lname, fname";
		$this->db->setSQL($sql);
		$rows = array();
		foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row){
            $row = array_change_key_case($row);

			$row['name'] = $row['fname'] .' ' . $row['lname'];
			unset($row['fname'], $row['lname']);
			array_push($rows, $row);
		}
		return $rows;
	}

	public function getRoles()
	{
		$this->db->setSQL("SELECT id, role_name FROM acl_roles ORDER BY role_name");
        $rows = array();
        foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row){
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

/*
        $roles = array_change_key_case($this->db->fetchRecords(PDO::FETCH_ASSOC));
        $roles = array_change_key_case($roles);
        print_r($roles);
		return $roles;
*/
	}

	public function getThemes()
	{
		return array(
			array(
				'name' => 'Gray', 'value' => 'ext-all-gray'
			), array(
				'name' => 'Blue', 'value' => 'ext-all'
			)
		);
	}

}
/*
$c = new CombosData();
print '<pre>';
//print_r($c->getAvailableLanguages());
print_r($c->getUsers());
*/