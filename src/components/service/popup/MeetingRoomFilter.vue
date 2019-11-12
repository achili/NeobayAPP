<template>
  <div class="meeting-room-filter-popup" @click.stop="closeCall">
    <div class="filter-popup-mask">
      <div class="filter-content" @click.stop>
        <div class="filter-content-data line">
          {{$t('message.date')}}
          <el-date-picker class="data-style"
                          format="M月dd日"
                          v-model="data"
                          :editable="false">
          </el-date-picker>
        </div>
        <div class="filter-content-place line">
          {{$t('message.locale')}}
          <el-select v-model="place" class="nb-select">
            <el-option
              :label="'全部'"
              :value="null">
            </el-option>
            <el-option
              label="一号楼"
              value="2">
            </el-option>
            <el-option
              label="二号楼"
              value="3">
            </el-option>
          </el-select>
        </div>
        <div class="filter-content-people line">
          {{$t('message.PersonNumber')}}
          <el-select v-model="people" class="nb-select">
            <el-option
             :label="'全部'"
             :value="null">
            </el-option>
            <el-option v-for="peopleType in peopleTypes" :key="peopleType.value"
              :label="peopleType.name"
              :value="peopleType.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import ConferenceRoom from "../../../common/model/conference/room/ConferenceRoom";

  export default {
    data(){
      return {
        pager: this.$store.state.conferenceRoomPager,
        peopleTypes: new ConferenceRoom().getCapacityList(),
        data: new Date(),
        place: "",
        people: ""
      }
    },
    props:{
      closeCall:{
        type: Function,
        required: false
      }
    },
    computed:{

    },
    watch:{
      "data"(newVal) {
        this.$store.state.meetingRoomDate = newVal;
      },
      "place"(newVal) {
        this.pager.setFilterValue("spaceBuildingId", newVal);
        this.refresh();
      },
      "people"(newVal) {
        this.pager.setFilterValue("capacityType", newVal);
        this.refresh();
      }
    },
    methods:{
      refresh() {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastPage(function () {
          that.pager.page++;
          that.pager.conferenceRooms.forEach(data => {
            data.poster.keepLocal(540, 100);
          });
        });
      }
    },
    mounted(){
      this.place = this.pager.getFilter("spaceBuildingId").value;
      this.people = this.pager.getFilter("capacityType").value;
      this.data = this.$store.state.meetingRoomDate;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .meeting-room-filter-popup{
    height: 100vh;
    width: 100vw;
    padding-top: 110px;
    .filter-popup-mask {
      background: rgba(0,0,0,.45);
      height: 100%;
      .filter-content {
        background: white;
        font-size: 15px;
        color: #888888;
        padding: 2px 15px 16px 15px;
        line-height: 50px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        .line {
          border-bottom: 1px solid #EFEFEF;
          margin-bottom: 4px;
        }
        .filter-content-data {
          .data-style {
            input {
              font-size: 15px;
              color: #888888;
              letter-spacing: 1px;
            }
            .el-input__prefix{
              display: none;
            }
            .el-input__inner{
              border: none;
            }
            .el-input__suffix {
              display: none;
            }
          }
        }
        .filter-content-place {

        }
        .filter-content-people {

        }
        .nb-select{
          input {
            font-size: 15px;
            color: #888888;
            letter-spacing: 1px;
          }
          margin-left: 15px;
          border: none;
          resize:none;
          outline:none;
          font-size: 15px;
          .el-input__inner{
            border:none;
          }
        }
      }

    }
  }
  @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio : 3){
    .meeting-room-filter-popup{
      padding-top: 128px;
    }
  }
</style>
