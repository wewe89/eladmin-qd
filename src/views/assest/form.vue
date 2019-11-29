<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="一级类别" >
        <el-input v-model="form.idPc.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="二级类别" >
        <el-input v-model="form.idSc" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="资产名称" >
        <el-input v-model="form.idAn" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="所属部门" >
        <el-input v-model="form.idDept" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="责任者" >
        <el-input v-model="form.idUser" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态" >
        <el-input v-model="form.status" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/myAssetList'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      id_pc: '',
      form: {
        id: '',
        idPc: { id: '' },
        idSc: '',
        idAn: '',
        idDept: '',
        idUser: '',
        status: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      
      // this.form.idPc.id = this.id_pc

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
      this.id_pc=''
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        idPc: { id: '' },
        idSc: '',
        idAn: '',
        idDept: '',
        idUser: '',
        status: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
