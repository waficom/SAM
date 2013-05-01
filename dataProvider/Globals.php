<?php
 /*
 GaiaEHR (Electronic Health Records)
 Globals.php
 Globals Settings dataProvider
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

include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Globals extends dbHelper
{
	
	/**
	 * @return array
	 */
	public static function getGlobals()
	{
		$dbh = new dbHelper();
		$sql = "SELECT GL_NAME, GL_INDEX, GL_VALUE FROM globals";
		
//		$conn -> setSQL("SELECT GL_NAME, GL_INDEX, GL_VALUE FROM globals");
		$rows = array();
       foreach ($dbh->conn->query($sql) as $row) {
			$rows[$row[0]] = $row[2];
		}
		return $rows;
	}

	/**
	 * @param stdClass $params
	 * @return stdClass
	 */
	public function updateGlobals(stdClass $params)
	{

		$data = get_object_vars($params);

		foreach ($data as $key => $value)
		{
			if (is_int($value))
			{
				$rec = trim($value);
			}
			else
			{
				$rec = $value;
			}
            $sqlcount = "SELECT COUNT(*) as countrec FROM globals WHERE gl_name = '" . $key . "'";
			$this -> setSQL($sqlcount);
            $r = $this->fetchRecord(PDO::FETCH_ASSOC);
			if ($r['COUNTREC'] > 0)
			{
				$sql = "UPDATE globals SET gl_value = '". $rec . "' WHERE gl_name = '" . $key . "'"; 			
				$this -> setSQL($sql);
			}
			else {
				$sql = "INSERT INTO globals (gl_name, gl_index, gl_value) VALUES ('". $key . "', 0, '" . $value . "')";
				$this -> setSQL($sql);
			} 			
			$this -> execLog();
		}
		$this -> setGlobals();

		return $params;
	}

	/**
	 * @static
	 * @return mixed
	 */
	public static function setGlobals()
	{
		$db = new dbHelper();
				
		$db -> setSQL("SELECT gl_name, gl_value FROM globals");
		foreach ($db->fetchRecords(PDO::FETCH_ASSOC) as $setting)
		{
			$_SESSION['global_settings'][$setting['GL_NAME']] = $setting['GL_VALUE'];
			
		}
		$_SESSION['global_settings']['timezone_offset'] = 0;
		$_SESSION['global_settings']['date_time_display_format'] = $_SESSION['global_settings']['date_display_format'] . ' ' . $_SESSION['global_settings']['time_display_format'];
		return $_SESSION['site']['path'];
	}

}
