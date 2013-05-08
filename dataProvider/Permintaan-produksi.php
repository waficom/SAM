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
include_once ($_SESSION['root'] . '/classes/Time.php');
class Produksi
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

    public function getProduksiLiveSearch(stdClass $params)
    {
        $this->db->setSQL("SELECT no_pp,
		                          description,
		                          pp_date,userinput,useredit,timeedit
							FROM PP_Produksi
   							WHERE no_pp          LIKE'$params->query%'
   							  OR description         LIKE'$params->query%' Order By no_pp ASC");
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

    public function getProduksi(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'timeedit';
        }
        $sql = "SELECT * FROM PP_Produksi ORDER BY $orderx DESC";
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
    public function addProduksi(stdClass $params)
    {
        // error_reporting(-1);
        $data = get_object_vars($params);
       // $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['name'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');//"select getdate()";
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
//"select getdate()";//Time::getLocalTime('Y-m-d H:i:s');
        $sql = $this -> db -> sqlBind($data, 'PP_Produksi', 'I');
        $this -> db -> setSQL($sql);
        //    print_r($sql);
        $this -> db -> execLog();
        return $params;
    }



    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateProduksi(stdClass $params)
    {
        $data = get_object_vars($params);
       // $data['co_id'] = $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['name'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        unset($data['id'], $data['no_pp'], $data['old_no_pp']);
        if (is_null($data['aktif']) || ($data['aktif'] == '')) {
            $data['aktif'] = '0';
        }
        $sql = $this -> db -> sqlBind($data, 'PP_Produksi', 'U', array('no_pp' => $params -> no_pp));
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteProduksi(stdClass $params)
    {
//		$sql = $this -> db -> sqlBind($data, 'Produksi', 'U', array('Produksi_id' => $params -> Produksi_id));
        $sql = "DELETE FROM PP_Produksi WHERE (no_pp = '$params->no_pp')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }
}
