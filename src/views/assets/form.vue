<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="一级类别">
        <!-- <el-input v-model="form.idPc.name" style="width: 370px;"/> -->
        <el-select v-model="pcid" style="width: 370px" placeholder="请选择一级类别" @change="selectPrimaryCategorys(pcid)">
          <el-option
            v-for="(item, index) in primaryCategorys"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级类别">
        <el-select v-model="scid" style="width: 370px" placeholder="请选择二级类别" @change="selectSecondaryCategorys(pcid)">
          <el-option
            v-for="(item, index) in secondaryCategorys"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="资产名称">
        <el-select v-model="anid" style="width: 370px" placeholder="请选择" @change="selectAssetName(anid)">
          <el-option
            v-for="(item, index) in assestNames"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门">
        <treeselect v-model="deptId" :options="depts" style="width: 370px" placeholder="选择部门(支持搜索)" :is-default-expanded="true" @select="selectDept" />
      </el-form-item>
      <el-form-item label="责任者">
        <el-input v-model="form.idUser.id" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.note" style="width: 370px" />
      </el-form-item>
      <!-- <el-form-item label="状态"  prop="form.status">
        <el-radio v-for="item in dicts" :key="item.id" v-model="form.status" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/assets/myAssetList'
import { getDepts } from '@/api/system/dept'
import { getAllPrimaryCategory } from '@/api/assets/myPrimaryCategory'
import { getAllSecondaryCategory } from '@/api/assets/mySecondaryCategory'
import { getAllAssetName } from '@/api/assets/myAssetName'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      pcid: '', scid: '', deptId: null, anid: '', note: '',
      primaryCategorys: [], secondaryCategorys: [], depts: [], assestNames: [],
      form: {
        id: '',
        idPc: { id: '' },
        idSc: { id: '' },
        idAn: '',
        idDept: { id: '' },
        idUser: { id: '', name: '' },
        note: '',
        name: '',
        status: true
      },
      rules: {
      },
      dicts: [{
        value: true,
        label: '启用'
      }, {
        value: false,
        label: '禁用'
      }]
    }
  },
  methods: {
    selectPrimaryCategorys(data) {
      this.scid = ''
      this.getSecondaryCategory(data)
    },
    selectSecondaryCategorys(data) {
      this.anid = ''
      this.getAssestNames(this.scid)
    },
    selectAssetName(data) {
      console.log(this.anid)
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.form.idPc.id = this.pcid
      this.form.idSc.id = this.scid
      this.form.idDept.id = this.deptId

      // console.log(this.id_pc)

      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false

      this.pcid = ''
      this.scid = ''
      this.deptId = null
      this.anid = ''
      this.$refs['form'].resetFields()

      this.form = {
        id: '',
        idPc: { id: '' },
        idSc: { id: '' },
        idAn: '',
        idDept: { id: '' },
        idUser: { id: '', name: '' },
        note: '',
        name: '',
        status: true
      }
    },

    getAssestNames(data) {
      getAllAssetName(data).then(res => {
        this.assestNames = res
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    getPrimaryCategory() {
      getAllPrimaryCategory().then(res => {
        this.primaryCategorys = res
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    getSecondaryCategory(data) {
      getAllSecondaryCategory(data).then(res => {
        this.secondaryCategorys = res
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },

    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content
      })
    },
    selectDept(node, instanceId) {
      console.log(node.name, node.id)
      // this.getJobs(node.id)
    }
  }
}
</script>

<style scoped>

</style>
