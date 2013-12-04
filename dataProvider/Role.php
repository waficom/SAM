<?php

if (!isset($_SESSION))
{
    session_name("GaiaEHR");
    session_start();
    session_cache_limiter('private');
}

$_SESSION['site']['flops'] = 0;
include_once ($_SESSION['root'] . '/classes/dbHelper.php');

class Role
{
    /**
     * @var dbHelper
     */
    private $db;

    function __construct()
    {
        // Declare all the variables that we are gone to use
        // within the class.
        (object)$this->db = new dbHelper();
        return;
    }


    public function hasRolePerms($pKey, $rKey){

        $this->db->setSQL("SELECT count(*) total FROM acl_role_perms WHERE (role_key = '$rKey') AND (perm_key = '$pKey')");
        $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        return ($row['TOTAL'] == 0 ? false : true);
    }

    public function UserhasRolePerms($pKey, $rKey){

        $this->db->setSQL("SELECT count(*) total FROM acl_user_perms WHERE (user_id = '$rKey') AND (perm_key = '$pKey')");
        $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        return ($row['TOTAL'] == 0 ? false : true);
    }


    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getRole(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'id';
        }
        $sql = "SELECT * FROM acl_roles ORDER BY $orderx";
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
    public function addRole(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'acl_roles', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateRole(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        $sql = $this -> db -> sqlBind($data, 'acl_roles', 'U', array('id' => $params->id));
        $this -> db -> setSQL($sql);
//        print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteRole(stdClass $params)
    {
        $sql = "DELETE FROM acl_roles WHERE (id = '$params->id')";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getPermissions(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'id';
        }
        $sql = "SELECT * FROM acl_permissions ORDER BY $orderx";
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
    public function addPermissions(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id']);
        foreach ($data AS $key => $val)
        {
            if ($val == '')
                unset($data[$key]);
        }
        $sql = $this -> db -> sqlBind($data, 'acl_permissions', 'I');
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updatePermissions(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        $sql = $this -> db -> sqlBind($data, 'acl_permissions', 'U', array('id' => $params->id));
        $this -> db -> setSQL($sql);
//        print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deletePermissions(stdClass $params)
    {
        $sql = "DELETE FROM acl_permissions WHERE (id = '$params->id')";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getRolePermissions(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'seq';
        }
        $sql = "select * from get_roles_data($params->role_id)";

/*
        $sql = "select arp.id, ap.perm_key, ap.perm_name, ap.perm_cat, ap.seq, arp.role_key, arp.val, arp.add_date
                from acl_permissions ap
                   left outer join acl_role_perms arp on (ap.perm_key = arp.perm_key)
                   left outer join acl_roles ar on (arp.role_key = ar.role_key) and (ar.id = $params->ar_id)
                order by $orderx";
*/
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
    public function addRolePermissions(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id'], $data['perm_cat'], $data['seq'], $data['role_id'], $data['role_name'], $data['perm_name']);
        if ($this->hasRolePerms($params['perm_key'], $params['role_key']))
        {
            $sql = $this -> db -> sqlBind($data, 'acl_role_perms', 'U', array('id' => $params->id));
        }
        else
        {
            $sql = $this -> db -> sqlBind($data, 'acl_role_perms', 'I');
        }
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateRolePermissions(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['perm_cat'], $data['seq'], $data['role_id'], $data['role_name'], $data['perm_name']);

        $data['add_date'] = $this->db->DateTime_Converter(Time::getLocalTime('Y-m-d H:i:s'));

        if ($this->hasRolePerms($data['perm_key'], $data['role_key']))
        {
            $sql = $this -> db -> sqlBind($data, 'acl_role_perms', 'U', array('id' => $params->id));
        }
        else
        {
            $sql = $this -> db -> sqlBind($data, 'acl_role_perms', 'I');
        }
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteRolePermissions(stdClass $params)
    {
        $sql = "DELETE FROM acl_role_perms WHERE (id = '$params->id')";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }
    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getUserPermissions(stdClass $params)
    {

        if (isset($params -> sort))
        {
            $orderx = $params -> sort[0] -> property . ' ' . $params -> sort[0] -> direction;
        }
        else
        {
            $orderx = 'seq';
        }
        $sql = "select * from get_user_roles_data($params->user_id)";

        /*
                $sql = "select arp.id, ap.perm_key, ap.perm_name, ap.perm_cat, ap.seq, arp.role_key, arp.val, arp.add_date
                        from acl_permissions ap
                           left outer join acl_role_perms arp on (ap.perm_key = arp.perm_key)
                           left outer join acl_roles ar on (arp.role_key = ar.role_key) and (ar.id = $params->ar_id)
                        order by $orderx";
        */
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
    public function addUserPermissions(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id'], $data['perm_cat'], $data['seq'], $data['usrname'], $data['perm_name']);
        if ($this->UserhasRolePerms($params['perm_key'], $params['role_key']))
        {
            $sql = $this -> db -> sqlBind($data, 'acl_user_perms', 'U', array('id' => $params->id));
        }
        else
        {
            $sql = $this -> db -> sqlBind($data, 'acl_user_perms', 'I');
        }
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateUserPermissions(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['perm_cat'], $data['seq'], $data['usrname'], $data['perm_name']);

        $data['add_date'] = $this->db->DateTime_Converter(Time::getLocalTime('Y-m-d H:i:s'));

        if ($this->UserhasRolePerms($data['perm_key'], $data['user_id']))
        {
            $sql = $this -> db -> sqlBind($data, 'acl_user_perms', 'U', array('id' => $params->id));
        }
        else
        {
            $sql = $this -> db -> sqlBind($data, 'acl_user_perms', 'I');
        }
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

    /**
     *
     * @param stdClass $params
     * @return stdClass
     */
    public function deleteUserPermissions(stdClass $params)
    {
        $sql = "DELETE FROM acl_user_perms WHERE (id = '$params->id')";
        $this -> db -> setSQL($sql);
        // print_r($sql);
        $this -> db -> execLog();
        return $params;
    }

}
